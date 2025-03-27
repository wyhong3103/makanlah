const { leaderboardService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const getRank = catchAsync(async (req, res) => {
  const result = await leaderboardService.getRank(req.user.id);
  res.send(result);
});

const getLeaderboardBatch = catchAsync(async (req, res) => {
  const result = await leaderboardService.getLeaderboardBatch(Number(req.params.index));
  res.send(result);
});

module.exports = {
  getRank,
  getLeaderboardBatch,
};
