const axios = require('axios');

const HttpError = require('../models/http-error');
require('dotenv').config();

const API_KEY = 'AIzaSyDgLmMpKCzveJf1_yuA0fUzzhy0WRChvZA';
//const config = require('../config');

const stripe = require('stripe')(process.env.STRIPE_SK, {
    apiVersion: process.env.STRIPE_API_VERSION || '2022-08-01'
  });

async function createStripeAccount() {
  
const stripeUserData = {};
stripeUserData['business_type'] = 'individual';
stripeUserData['email'] = 'dee2@gmail.com';  
stripeUserData['country'] = 'US';
stripeUserData['type'] = 'express';
stripeUserData['individual'] = {
  'last_name' : 'LastNAme',
  'first_name' : 'Fisrtname',
  'email': 'dee1@gmail.com'
};
console.log(process.env.STRIPE_SK);

const account = await stripe.accounts.create(stripeUserData);
console.log("SSSSS",stripeUserData);
// Create an account link for the user's Stripe account
const accountLink = await stripe.accountLinks.create({
  account: account.id,
  refresh_url: process.env.STRIPE_PUBLIC_DOMAIN + '/api/stripeusers/authorize',
  return_url: process.env.STRIPE_PUBLIC_DOMAIN + '/api/stripeusers/onboarded',
  type: 'account_onboarding'
});
console.log("Account link ", accountLink);
account['accountLink'] = accountLink;
  return account;
}

module.exports = createStripeAccount;