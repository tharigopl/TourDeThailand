const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const stripeService = require('../util/stripeservice');
//const onBoardStripe = require('../util/stripeservice');


const createStAccount = async (req, res, next) => {
    console.log("CreaTE Stripe Account1");
    let accountLink;
    try{
      console.log("CreaTE Stripe Account2");
        accountLink = await stripeService.createStripeAccount();
        console.log("CreaTE Stripe Account3");
    }catch(err){
        const error = new HttpError(
            'Linking stripe account failed, please try again later.',
            500
            );
            return next(error);
    }
    

    res.json({
        accountLink: accountLink
      });
  };

  const onBoardedStripe = async (req, res, next) => {
    console.log("Onboarded stripe");
    let accountLink;
    try{
        accountLink = await stripeService.onBoardStripe();
    }catch(err){
        const error = new HttpError(
            'Linking stripe account failed, please try again later.',
            500
            );
            return next(error);
    }
    

    res.json({
        accountLink: accountLink
      });
  };

  exports.createStAccount = createStAccount;
  exports.onBoardedStripe = onBoardedStripe;