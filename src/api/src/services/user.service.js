const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const { prisma } = require('./prisma.service');
const bucketService = require('./bucket.service');
const path = require('path');

const isPasswordMatch = async (pw1, pw2) => {
  const res = await bcrypt.compare(pw1, pw2);
  return res;
};

const isEmailTaken = async (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const uploadProfileImage = async (file, name) => {
  const fileName = file.originalname;
  const fileExtension = path.extname(fileName);
  const filePath = `public/${name}_${Date.now()}${fileExtension}`;
  const link = await bucketService.uploadToS3(file, filePath);
  return link;
};

const createUser = async (userBody) => {
  if (await isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  userBody.password = await bcrypt.hash(userBody.password, 8);
  const user = await prisma.user.create({
    data: userBody,
  });
  await prisma.food.create({
    data: {
      userId: user.id,
    },
  });
  await prisma.achievement.create({
    data: {
      userId: user.id,
    },
  });

  return user;
};

const getUserByEmailWithPassword = async (email) => {
  return prisma.user.findUnique({ where: { email }, omit: { password: false } });
};

const getUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};

const getUserById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

const getUserByIdWithPassword = async (id) => {
  return prisma.user.findUnique({ where: { id }, omit: { password: false } });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserByIdWithPassword(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await isEmailTaken(updateBody.email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (updateBody.new_password) {
    if (await isPasswordMatch(updateBody.old_password, user.password)) {
      updateBody.password = await bcrypt.hash(updateBody.new_password, 8);
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong password');
    }
    delete updateBody.new_password;
    delete updateBody.old_password;
  }

  return await prisma.user.update({
    where: { id: userId },
    data: updateBody,
  });
};

const getYou = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      achievement: true,
      food: true,
    },
  });
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserByEmailWithPassword,
  getUserById,
  updateUserById,
  uploadProfileImage,
  getYou,
};
