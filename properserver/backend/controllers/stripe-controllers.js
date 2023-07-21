const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const stripeService = require('../util/stripeservice');
//const onBoardStripe = require('../util/stripeservice');
const StripeUser = require('../models/stripeuser');
const StripeUserAccountLink = require('../models/stripeaccountlink');


const createStAccount = async (req, res, next) => {
    console.log("CreaTE Stripe Account1");
    let accountLink;
    let account;
    try{
      console.log("CreaTE Stripe Account2");
        account = await stripeService.createStripeAccount();
        console.log("CreaTE Stripe Account5");
        const newAcc = new StripeUser(account);
        await newAcc.save();

        console.log("CreaTE Stripe Account3");
    }catch(err){
        console.log("CreaTE Stripe Account3", err);
        const error = new HttpError(
            'Linking stripe account failed, please try again later.',
            500
            );
            return next(error);
    }

    try{
        console.log("CreaTE Stripe Account2= Link");
          accountLink = await stripeService.createStripeAccountLink(account.id);
          console.log("CreaTE Stripe Account Link 2");
          const newAccLink = new StripeUserAccountLink(account);
            await newAccLink.save();
            console.log("CreaTE Stripe Account Link 3");
      }catch(err){
          const error = new HttpError(
              'Linking stripe account failed, please try again later.',
              500
              );
              return next(error);
      }
    

    res.json({
        account: account,
        accountLink:accountLink
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