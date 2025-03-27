const config = require('../config/config');
const { OAuth2Client } = require('google-auth-library');
const oAuth2Client = new OAuth2Client(config.google.id, config.google.secret, 'postmessage');
const { prisma } = require('../services/prisma.service');

const googleAuth = async (req, res, next) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code);
  oAuth2Client.setCredentials(tokens);

  const ticket = await oAuth2Client.verifyIdToken({
    idToken: tokens.id_token,
    audience: config.google.id,
  });

  const payload = ticket.getPayload();

  const { sub, email, name, picture } = payload;

  let user = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { googleId: sub }],
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name,
        image: picture,
        googleId: sub,
        email,
        isEmailVerified: true,
      },
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
  }

  req.user = user;

  next();
};

module.exports = googleAuth;
