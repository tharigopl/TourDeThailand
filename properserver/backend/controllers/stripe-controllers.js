const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const createStripeAcc = require('../util/stripeservice');


const createStripeAccount = async (req, res, next) => {
    console.log("CreaTE Stripe Account");
    let accountLink;
    try{
        accountLink = await createStripeAcc();
    }catch(err){
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
            );
            return next(error);
    }
    

    res.json({
        accountLink: accountLink
      });
    // let users;
  
    // let existingUser;
    // try {
    //   existingUser = await User.findById(req.params.id);
    // } catch (err) {
    //   const error = new HttpError(
    //     'Signing up failed, please try again later.',
    //     500
    //   );
    //   return next(error);
    // }
  
    // // try {
    // //   users = await User.find({}, '-password');
    // // } catch (err) {
    // //   const error = new HttpError(
    // //     'Fetching users failed, please try again later.',
    // //     500
    // //   );
    // //   return next(error);
    // // }
    // res.json({ user: existingUser });
  };

  exports.createStripeAccount = createStripeAccount;