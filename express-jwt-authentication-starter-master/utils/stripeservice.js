
const config = require('../config');

const stripe = require('stripe')(process.env.STRIPE_SECRETKEY, {
    apiVersion: process.env.STRIPE_API_VERSION || '2022-08-01'
  });

async function createStripeAccount(stripeuser) {
  
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
//console.log("Stripe user data cloned ", stripeUserData);

const account = await stripe.accounts.create(stripeUserData);

//console.log("Steripe service createStripeAccount", JSON.stringify(account));


// Create an account link for the user's Stripe account
const accountLink = await stripe.accountLinks.create({
  account: account.id,
  refresh_url: config.publicDomain + '/api/stripeusers/authorize',
  return_url: config.publicDomain + '/api/stripeusers/onboarded',
  type: 'account_onboarding'
});
console.log("Account link ", accountLink);
account['accountLink'] = accountLink;

  return account;
}

module.exports = createStripeAccount;
