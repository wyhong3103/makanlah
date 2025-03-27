const { prisma } = require('./prisma.service');

const first_find = (foods) => {
  let cnt = 0;
  for (let key in foods) {
    if (key === 'userId') continue;
    cnt += foods[key] !== null;
  }

  return cnt >= 1;
};

const halfway_there = (foods) => {
  let cnt = 0;
  for (let key in foods) {
    if (key === 'userId') continue;
    cnt += foods[key] !== null;
  }

  return cnt >= 15;
};

const true_malaysian = (foods) => {
  let cnt = 0;
  for (let key in foods) {
    if (key === 'userId') continue;
    cnt += foods[key] !== null;
  }

  return cnt === 30;
};

const snek_kaki = (foods) => {
  return (
    foods['curry_puff'] != null &&
    foods['kaya_toast'] !== null &&
    foods['otak_otak'] !== null &&
    foods['pisang_goreng'] !== null &&
    foods['rojak'] !== null &&
    foods['satay'] !== null
  );
};

const fruitful_journey = (foods) => {
  return foods['durian'] !== null && foods['papaya'] !== null && foods['pineapple'] !== null && foods['rambutan'] !== null;
};

const manisnya = (foods) => {
  return (
    foods['apam_balik'] !== null &&
    foods['ais_kacang'] !== null &&
    foods['cendol'] !== null &&
    foods['kuih_seri_muka'] !== null &&
    foods['ondeh_ondeh'] !== null
  );
};

const yamcha_loh = (foods) => {
  return (
    foods['air_limau'] !== null && foods['air_milo'] !== null && foods['air_sirap'] !== null && foods['teh_tarik'] !== null
  );
};

const raja_makan = (foods) => {
  return (
    foods['char_kuey_teow'] !== null &&
    foods['chicken_rice'] !== null &&
    foods['congee'] !== null &&
    foods['fried_rice'] !== null &&
    foods['kottu'] !== null &&
    foods['mee_goreng'] !== null &&
    foods['nasi_biryani'] !== null &&
    foods['nasi_kerabu'] !== null &&
    foods['nasi_lemak'] !== null &&
    foods['roti_canai'] !== null &&
    foods['thosai'] !== null
  );
};

const unlockAchievements = async (user) => {
  const achievements_f = {
    first_find: first_find,
    halfway_there: halfway_there,
    true_malaysian: true_malaysian,
    fruitful_journey: fruitful_journey,
    raja_makan: raja_makan,
    snek_kaki: snek_kaki,
    yamcha_loh: yamcha_loh,
    manisnya: manisnya,
  };

  const userObj = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      achievement: true,
      food: true,
    },
  });

  const achievement = userObj['achievement'];
  const foods = userObj['food'];

  const new_unlocks = [];

  for (let key in achievements_f) {
    if (achievements_f[key](foods) && achievement[key] === null) {
      new_unlocks.push(key);
    }
  }

  const updateBody = {};

  for (const key of new_unlocks) {
    updateBody[key] = new Date();
  }

  await prisma.achievement.update({
    where: { userId: user.id },
    data: updateBody,
  });

  return new_unlocks;
};

module.exports = {
  unlockAchievements,
};
