const express = require('express');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');
const { multerService } = require('../services');
const auth = require('../middlewares/auth');

const router = express.Router();

// router.get('/:userId', userController.getUser);
router.put(
  '/you',
  auth('putYou'),
  multerService.uploadImage.single('image'),
  validate(userValidation.updateYou),
  userController.updateYou
);
router.get('/you', auth('getYou'), userController.getYou);

module.exports = router;
