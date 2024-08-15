import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import Class from '../models/Class.js';
import { BadRequestError, NotFoundError } from '../utils/CustomErrors.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { sendParentRequestEmail } from '../utils/sendParentRequestEmail.js';
import { UserRoles } from '../utils/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const showCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId).populate(
    'pendingRequests.parentId'
  );
  return res
    .status(StatusCodes.OK)
    .json({ user: { ...user._doc, userId: req.user.userId } });
};

export const addAvatar = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const avatar = req?.files?.avatar;

  if (!req.files || !avatar) {
    throw new BadRequestError('Please provide avatar');
  }

  const maxSize = 1024 * 1024;
  if (avatar.size > maxSize) {
    throw new BadRequestError('Please upload an image smaller than 1MB');
  }

  const imagePath = path.join(
    __dirname,
    `../public/uploads/users/` + `${avatar.name}`
  );

  if (
    user.avatar !== '/uploads/users/kid.jpg' &&
    user.avatar !== '/uploads/users/parent.jpg' &&
    user.avatar !== '/uploads/users/teacher.jpg'
  ) {
    const oldImagePath = path.join(__dirname, '../public', user.avatar);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  await avatar.mv(imagePath);
  user.avatar = `/uploads/users/${avatar.name}`;
  await user.save();

  return res.status(StatusCodes.OK).json({ msg: 'Avatar uploaded!' });
};

export const updateUser = async (req, res) => {
  const { email, firstName, lastName, password, role } = req.body;
  const user = await User.findById(req.user.userId);
  if (!user) {
    throw new BadRequestError('User not found');
  }

  if (req.files && req?.files?.avatar) {
    const avatar = req.files.avatar;
    const maxSize = 1024 * 1024;
    if (avatar.size > maxSize) {
      throw new BadRequestError('Please upload an image smaller than 1MB');
    }

    const imagePath = path.join(
      __dirname,
      `../public/uploads/users/` + `${avatar.name}`
    );

    if (
      user.avatar !== '/uploads/users/kid.jpg' &&
      user.avatar !== '/uploads/users/parent.jpg' &&
      user.avatar !== '/uploads/users/teacher.jpg'
    ) {
      const oldImagePath = path.join(__dirname, '../public', user.avatar);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    await avatar.mv(imagePath);
    user.avatar = `/uploads/users/${avatar.name}`;
  }

  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  if (password) user.password = password;
  if (req.user.role === 'superadmin' && role) user.role = role;
  else user.role = user.role;
  await user.save();

  return res.status(StatusCodes.OK).json({ msg: 'user updated', user });
};

export const getAllUsers = async (req, res) => {
  let users = await User.find();
  users = users.filter((user) => user.id !== req.user.userId);
  return res.status(StatusCodes.OK).json({ users });
};

export const addKid = async (req, res) => {
  const { uniqueKeyForStudent } = req.body;
  console.log('🚀 ~ addKid ~ uniqueKeyForStudent:', uniqueKeyForStudent);

  const kid = await User.findOne({ uniqueKeyForStudent });
  if (!kid) {
    throw new NotFoundError('Kid not found');
  }

  const pendingRequest = kid.pendingRequests.find(
    (request) => request.parentId.toString() === req.user.userId
  );
  console.log(pendingRequest);
  if (pendingRequest) {
    throw new BadRequestError('Request ' + pendingRequest.status);
  }

  kid.pendingRequests.push({ parentId: req.user.userId });
  await kid.save();

  return res.status(StatusCodes.OK).json({ msg: 'Request sent' });
};

export const acceptParentRequest = async (req, res) => {
  const { requestId } = req.body;

  const kid = await User.findById(req.user.userId);
  if (!kid) {
    throw new NotFoundError('Kid not found');
  }

  const request = kid.pendingRequests.id(requestId);
  if (!request) {
    throw new NotFoundError('Request not found');
  }

  request.status = 'accepted';
  await kid.save();

  const parent = await User.findById(request.parentId);
  parent.kids.push(kid._id);
  await parent.save();
  await sendParentRequestEmail({
    name: parent.firstName,
    email: parent.email,
    type: 'accepted',
    kidName: kid.firstName,
  });
  return res.status(StatusCodes.OK).json({ msg: 'Request accepted' });
};

export const rejectParentRequest = async (req, res) => {
  const { requestId } = req.body;

  const kid = await User.findById(req.user.userId);
  if (!kid) {
    throw new NotFoundError('Kid not found');
  }

  const request = kid.pendingRequests.id(requestId);
  if (!request) {
    throw new NotFoundError('Request not found');
  }
  const parent = await User.findById(request.parentId);

  request.status = 'rejected';
  await kid.save();
  await sendParentRequestEmail({
    name: parent.firstName,
    email: parent.email,
    kidName: kid.firstName,
    type: 'accepted',
  });
  return res.status(StatusCodes.OK).json({ msg: 'Request rejected' });
};
export const getUsersLoggedIn24Hours = async (req, res) => {
  const users = await User.find({
    lastLogin: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  });
  return res.status(StatusCodes.OK).json({ users, count: users.length });
};

export const getUserProfile = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError(`User with id ${userId} not found`);
  }

  res.status(StatusCodes.OK).json({
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      parentName: user.parentName,
      teacherName: user.teacherName,
      uniqueKeyForStudent: user.uniqueKeyForStudent,
    },
  });
}

export const getUsersBasedOnRole = async (req, res) => {
  const { role, userId } = req.user;
  let users;
  if (role === UserRoles.SUPERADMIN) {
    users = await User.find({});
  } else if (role === UserRoles.TEACHER) {
    const classes = await Class.find({ instructor: userId }).populate(
      'students'
    );
    const students = new Set();
    classes.forEach(classItem => {
      classItem.students.forEach(std => {
        if (std) {
          students.add(std);
        }
      });
    });
    users = Array.from(students);
  } else if (role === UserRoles.PARENT) {
    let parent = await User.findById(userId).populate('kids');
    users = parent.kids || [];
  } else {
    const classes = await Class.find({ students: userId }).populate(
      'instructor'
    );
    const instructors = new Set();
    classes.forEach(classItem => {
      if (classItem.instructor) {
        instructors.add(classItem.instructor);
      }
    });
    users = Array.from(instructors);
  }
  res.status(StatusCodes.OK).json({ users });
};
