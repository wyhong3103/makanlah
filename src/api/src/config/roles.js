const allRoles = {
  user: ['getLeaderboardBatch', 'getYourRank', 'postCapture', 'postFeedback', 'putYou', 'getYou'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
