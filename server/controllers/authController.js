import {
  BadRequestError,
  UnauthenticatedError,
} from '../utils/CustomErrors.js';
import { attachCookiesToResponse, createTokenUser } from '../utils/jwt.js';

import User from '../models/User.js';
import Token from '../models/Token.js';
import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';
import { sendVerificationEmail } from '../utils/sendVerficationEmail.js';
import { sendResetPasswordEmail } from '../utils/sendResetPasswordEmail.js';
import createHash from '../utils/createHash.js';
import { UserRoles } from '../utils/constants.js';
import {} from 'uuid';

export const register = async (req, res) => {
  const { email, firstName, lastName, password, role, subject } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists');
  }
  if (
    role.toLowerCase() !== UserRoles.PARENT &&
    role.toLowerCase() !== UserRoles.STUDENT &&
    role.toLowerCase() !== UserRoles.TEACHER
  ) {
    throw new BadRequestError('Role must be parent,student or teacher');
  }
  if (role === 'teacher' && !subject) {
    throw new BadRequestError('Subject is required for teachers');
  }

  let uniqueKeyForStudent;
  let avatar;

  if (role.toLowerCase() === UserRoles.STUDENT) {
    uniqueKeyForStudent = crypto.randomBytes(20).toString('hex');
    avatar = '/uploads/users/kid.jpg';
  } else if (role.toLowerCase() === UserRoles.TEACHER) {
    avatar = '/uploads/users/teacher.jpg';
  } else avatar = '/uploads/users/parent.jpg';

  const verificationToken = crypto.randomBytes(40).toString('hex');

  const user = await User.create({
    email,
    firstName,
    lastName,
    password,
    role: role.toLowerCase(),
    verificationToken,
    avatar,
    uniqueKeyForStudent,
    subject: role === 'teacher' ? subject : undefined,
  });

  await sendVerificationEmail({
    name: user.firstName,
    email: user.email,
    verificationToken: user.verificationToken,
    origin: process.env.ORIGIN,
  });
  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
  });
};

export const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Verification Failed!');
  }
  if (verificationToken !== user.verificationToken) {
    throw new UnauthenticatedError('Verification Failed!');
  }
  user.isVerified = true;
  user.verified = Date.now();
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Verification Failed!');
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  if (!user.verified) {
    throw new UnauthenticatedError('Please verify email!');
  }

  const tokenUser = createTokenUser(user);

  let refreshToken = '';

  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new UnauthenticatedError('Invalid Credentials');
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    user.lastLogin = new Date();
    await user.save();
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  user.lastLogin = new Date();
  await user.save();

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

export const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError('Please provide valid email');
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString('hex');
    // send email
    await sendResetPasswordEmail({
      name: user.firstName,
      email: user.email,
      token: passwordToken,
      origin: process.env.ORIGIN,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Please check your email for reset password link' });
};

export const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new BadRequestError('Please provide token,email and password');
  }
  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }

  res.status(StatusCodes.OK).json({ msg: 'Password Updated' });
};
