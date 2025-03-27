const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const tokenService = require('./token.service');
const userService = require('./user.service');
const { tokenTypes } = require('../config/tokens');
const ApiError = require('../utils/ApiError');
const { prisma } = require('./prisma.service');

const isPasswordMatch = async (pw1, pw2) => {
  const res = await bcrypt.compare(pw1, pw2);
  return res;
};

const loginWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmailWithPassword(email);
  if (!user || !(await isPasswordMatch(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  delete user.password;
  return user;
};

const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.userId);
    if (!user) {
      throw new Error();
    }
    await tokenService.deleteTokens({ userId: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

const logout = async (refreshToken) => {
  const refreshTokenRec = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
  await tokenService.removeToken(refreshToken);
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenRec = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenRec.userId);
    if (!user) {
      throw new Error();
    }
    return tokenService.generateAccessToken(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

const isEmailTaken = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    return true;
  }
  return false;
};

// const resetPassword = async (resetPasswordToken, newPassword) => {
//   try {
//     const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
//     const user = await userService.getUserById(resetPasswordTokenDoc.user);
//     if (!user) {
//       throw new Error();
//     }
//     await userService.updateUserById(user.id, { password: newPassword });
//     await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
//   } catch (error) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
//   }
// };

module.exports = {
  loginWithEmailAndPassword,
  verifyEmail,
  logout,
  refreshAuth,
  isEmailTaken,
  // resetPassword,
};
