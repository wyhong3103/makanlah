const express = require('express');
const validate = require('../middlewares/validate');
const predictionValidation = require('../validations/prediction.validation');
const predictionController = require('../controllers/prediction.controller');
const auth = require('../middlewares/auth');
const { multerService } = require('../services');

const router = express.Router();

// capture image validation
router.post('/', auth('postCapture'), multerService.uploadImage.single('image'), predictionController.postPrediction);

// feedback submission
router.post('/feedback', auth('postFeedback'), validate(predictionValidation.feedback), predictionController.updateFeedback);

module.exports = router;
