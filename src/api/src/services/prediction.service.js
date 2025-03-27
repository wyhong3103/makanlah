const { prisma } = require('./prisma.service');
const httpStatus = require('http-status');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const bucketService = require('./bucket.service');
const achievementService = require('./achievement.service');
const path = require('path');

const predict = async (filePath) => {
  const image_uri = `s3://${config.aws.bucketName}/${filePath}`
  const response = await fetch(config.inference_url+'/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      'image_uri': image_uri
    })
  });

  const data = await response.json();

  return data;
};

const postPrediction = async (user, file) => {
  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No image found');
  }

  const fileName = file.originalname;
  const fileExtension = path.extname(fileName);
  const filePath = `datasets/user_images/${user.name}_${Date.now()}${fileExtension}`;
  const filePathWithoutDatasetsPrefix = `user_images/${user.name}_${Date.now()}${fileExtension}`;
  await bucketService.uploadToS3(file, filePath);

  const result = await predict(filePath);
  const prediction = result['prediction'];
  const probabilities = result['probabilities'];

  let unlockedAchievements = [];

  let totalUnlocked = user.totalUnlocked;

  if (prediction !== 'none') {
    const userFood = await prisma.food.findUnique({
      where: { userId: user.id },
    });

    if (!userFood[prediction]) {
      const updateBody = {};
      updateBody[prediction] = new Date();

      await prisma.food.update({
        where: { userId: user.id },
        data: updateBody,
      });

      totalUnlocked += 1;
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          lastUnlocked: new Date(),
          totalUnlocked: totalUnlocked,
        },
      });
    }

    unlockedAchievements = await achievementService.unlockAchievements(user);
  }

  const predictionObj = await prisma.prediction.create({
    data: {
      image: filePathWithoutDatasetsPrefix,
      userId: user.id,
      predicted: prediction,
      ...probabilities
    },
  });

  return {
    predictionId: predictionObj.predictionId,
    predicted: prediction,
    unlockedAchievements,
    totalUnlocked,
  };
};

const updateFeedback = async (feedbackBody) => {
  return prisma.prediction.update({
    where: { predictionId: feedbackBody.predictionId },
    data: { feedback: feedbackBody.feedback },
  });
};

module.exports = {
  postPrediction,
  updateFeedback,
};
