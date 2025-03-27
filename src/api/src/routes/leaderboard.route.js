const express = require('express');
const router = express.Router();
const { leaderboardController } = require('../controllers');
const auth = require('../middlewares/auth');

router.get('/your-rank', auth('getYourRank'), leaderboardController.getRank);
router.get('/batch/:index', auth('getLeaderboardBatch'), leaderboardController.getLeaderboardBatch);

module.exports = router;
