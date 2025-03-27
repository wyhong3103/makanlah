const { prisma } = require('./prisma.service');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 60, checkperiod: 350 });

const getLeaderboardBatch = async (index) => {
  let result = myCache.get(index);
  if (result == undefined) {
    result = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        totalUnlocked: true,
        lastUnlocked: true,
      },
      orderBy: [
        {
          totalUnlocked: 'desc',
        },
        {
          lastUnlocked: 'asc',
        },
      ],
      skip: index,
      take: 20,
    });
    myCache.set(index, result);
  }
  return result;
};

const getRank = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      image: true,
      totalUnlocked: true,
      lastUnlocked: true,
    },
  });

  const rank = await prisma.user.count({
    where: {
      OR: [
        {
          totalUnlocked: {
            gt: user.totalUnlocked,
          },
        },
        {
          totalUnlocked: user.totalUnlocked,
          lastUnlocked: {
            lt: user.lastUnlocked,
          },
        },
      ],
    },
  });

  user.rank = rank + 1;

  return user;
};

module.exports = {
  getRank,
  getLeaderboardBatch,
};
