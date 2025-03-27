const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});

module.exports = {
  prisma,
};
