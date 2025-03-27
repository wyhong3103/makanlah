const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { predictionService } = require('../services');

const postPrediction = catchAsync(async (req, res) => {
  const result = await predictionService.postPrediction(req.user, req.file);
  res.send(result);
});

const updateFeedback = catchAsync(async (req, res) => {
  const result = await predictionService.updateFeedback(req.body);
  res.send(result);
});

module.exports = {
  postPrediction,
  updateFeedback,
};
