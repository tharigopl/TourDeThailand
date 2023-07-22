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
    console.log("CreaTE Stripe Account1", req.userData);
    let accountLink;
    let account;
    let stripeuserdata = {};

    let existingStripeUser;
    try {
      existingStripeUser = await StripeUser.findOne({ email: req.userData.userId.email });
    } catch (err) {
      const error = new HttpError(
        'Stripe User Not Found',
        500
      );
      //return next(error);
    }
  
    if (existingStripeUser) {
      const exStUser = await stripeService.retrieveStripeAccount(existingStripeUser.id);
      console.log("Existing Struoe ", exStUser);
    }else{
      try{
        console.log("CreaTE Stripe Account2");
        stripeuserdata['email'] = req.userData.userId.email;
          account = await stripeService.createStripeAccount(stripeuserdata);
          console.log("CreaTE Stripe Account5", account);
          
      }catch(err){
          console.log("CreaTE Stripe Account3", err);
          const error = new HttpError(
              'Linking stripe account failed, please try again later.',
              500
              );
              return next(error);
      }

      try{
          console.log("CreaTE Stripe Account2= Link", account.id);
            accountLink = await stripeService.createStripeAccountLink(account.id);
            console.log("CreaTE Stripe Account Link 2");

            const newAccLink = new StripeUserAccountLink(accountLink);
            await newAccLink.save();
            console.log("CreaTE Stripe Account Link 3", newAccLink);
            account['accountlink'] = newAccLink._id;
            
            const newAcc = new StripeUser(account);
            const savedAcc = await newAcc.save();

            let existingUser;
            try {
              existingUser = await User.findOne({ email: account.email });
              console.log("CreaTE Stripe Account Link 3", existingUser);
              existingUser['stripeuser'] = savedAcc._id;

              await existingUser.save();

              console.log("CreaTE Stripe Account99");
            } catch (err) {
              const error = new HttpError(
                'Signing up failed, please try again later.',
                500
              );
              return next(error);
            }

            console.log("CreaTE Stripe Account3");
        }catch(err){
            const error = new HttpError(
                'Linking stripe account failed, please try again later.'+err,
                500
                );
                return next(error);
        }
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