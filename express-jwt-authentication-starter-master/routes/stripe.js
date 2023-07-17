const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');
const config = require('../config');
const stripe = require('stripe')(config.stripe.secretKey, {
  apiVersion: config.stripe.apiVersion || '2022-08-01'
});

router.get('/pstripe', utils.authMiddleware, (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this stripe!"});
});

router.post('/pstripe/authorize', utils.authMiddleware, async (req, res, next) => {
    console.log("stripe", config.stripe.secretKey);
    try {
        const account = await stripe.accounts.create({
            type: 'custom',
            country: 'US',
            email: 'jenny.rosen@example.com',
            capabilities: {
              card_payments: {requested: true},
              transfers: {requested: true},
            },
          });
      } catch (err) {
        console.log('Failed to create a Stripe account.');
        console.log(err);
        next(err);
      }

    res.status(200).json({ success: true, msg: "You are successfully pstripe authorize to this stripe!"});
});

module.exports = router;