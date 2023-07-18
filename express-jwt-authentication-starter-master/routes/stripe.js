const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');
const createStripeAccount = require('../utils/stripeservice');
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
        const stripeUserData = {};
        stripeUserData['business_type'] = 'individual';
        stripeUserData['email'] = stripeuser.email;  
        stripeUserData['country'] = 'US';
        stripeUserData['type'] = 'express';
        stripeUserData['individual'] = {
          'last_name' : stripeuser.last_name,
          'first_name' : stripeuser.first_name,
          'email': stripeuser.email
        };  

        const account = await createStripeAccount(stripeUserData);
      } catch (err) {
        console.log('Failed to create a Stripe account.');
        console.log(err);
        next(err);
      }

    res.status(200).json({ success: true, msg: "You are successfully pstripe authorize to this stripe!"});
});

module.exports = router;