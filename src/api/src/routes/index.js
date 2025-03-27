const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const exampleRoute = require('./example.route');
const predictRoute = require('./prediction.route');
const leaderboardRoute = require('./leaderboard.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/example',
    route: exampleRoute,
  },
  {
    path: '/prediction',
    route: predictRoute,
  },
  {
    path: '/leaderboard',
    route: leaderboardRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
