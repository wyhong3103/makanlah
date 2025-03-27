const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(Number(req.params.userId));
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateYou = catchAsync(async (req, res) => {
  if (req.file) {
    const link = await userService.uploadProfileImage(req.file, req.user.name);
    req.body.image = link;
  }
  const user = await userService.updateUserById(req.user.id, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getYou = catchAsync(async (req, res) => {
  const tables = await userService.getYou(req.user.id);
  res.send(tables);
});

module.exports = {
  createUser,
  getUser,
  updateYou,
  deleteUser,
  getYou,
};
