import jwt from 'jsonwebtoken';

export const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

export const isTokenValid = token => jwt.verify(token, process.env.JWT_SECRET);

export const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

  const oneDay = 1000 * 60 * 60 * 24;
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    sameSite: 'None',
    signed: false,
    secure: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    sameSite: 'None',
    signed: false,
    secure: true,
    expires: new Date(Date.now() + longerExp),
  });
};
export const createTokenUser = user => {
  return { firstName: user.firstName, userId: user._id, role: user.role };
};
