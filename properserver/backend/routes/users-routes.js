const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');
const friendsController = require('../controllers/friends-controllers');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', usersController.getUsers);

router.get('/:id',usersController.findSingleUserById);

router.post(
  '/signup',
  // fileUpload.single('image'),
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersController.signup
);

router.post('/login', usersController.login);

router.patch(
  '/:id',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 })
  ],
  usersController.updateUser
);

router.post(
  '/:id/friend',
  // fileUpload.single('image'),
  [
    check('firstname')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('lastname')
      .not()
      .isEmpty()
  ],
  friendsController.createFriend
);

router.get('/:id/friends', friendsController.getAllFriendsForUser);



module.exports = router;
