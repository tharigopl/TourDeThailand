const express = require('express');
const { check } = require('express-validator');

const stripeControllers = require('../controllers/stripe-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();



router.use(checkAuth);

router.get('/link', stripeControllers.createStripeAccount);

// router.post(
//   '/',
//   //fileUpload.single('image'),
//   [
//     check('title')
//       .not()
//       .isEmpty(),
//     check('description').isLength({ min: 5 }),
//     check('address')
//       .not()
//       .isEmpty()
//   ],
//   placesControllers.createPlace
// );

// router.patch(
//   '/:pid',
//   [
//     check('title')
//       .not()
//       .isEmpty(),
//     check('description').isLength({ min: 5 })
//   ],
//   placesControllers.updatePlace
// );

// router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;
