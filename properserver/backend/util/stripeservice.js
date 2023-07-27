const axios = require("axios");

const HttpError = require("../models/http-error");
require("dotenv").config();

const API_KEY = "AIzaSyDgLmMpKCzveJf1_yuA0fUzzhy0WRChvZA";
//const config = require('../config');

const stripe = require("stripe")(process.env.STRIPE_SK, {
  apiVersion: process.env.STRIPE_API_VERSION || "2022-08-01",
});

async function createStripeAccount(stripeUserData) {
  //const stripeUserData = {};
  //stripeUserData['business_type'] = 'individual';
  //stripeUserData['email'] = 'tori@gmail.com';
  stripeUserData["country"] = "US";
  stripeUserData["type"] = "standard";
  // stripeUserData['individual'] = {
  //   'last_name' : 'DDDDDE',
  //   'first_name' : 'SSSSSSSDD',
  //   'email': 'tori@gmail.com'
  // };

  const account = await stripe.accounts.create(stripeUserData);
  //console.log("SSSSS",account);
  // Create an account link for the user's Stripe account
  // const accountLink = await stripe.accountLinks.create({
  //   account: account.id,
  //   refresh_url: process.env.STRIPE_PUBLIC_DOMAIN + '/api/stripe/authorize',
  //   return_url: process.env.STRIPE_PUBLIC_DOMAIN + '/api/stripe/onboarded',
  //   type: 'account_onboarding'
  // });
  // console.log("Account link ", accountLink);
  // account['accountLink'] = accountLink;
  return account;
}

async function createStripeAccountLink(accountid) {
  console.log("SSSSS", accountid);
  // Create an account link for the user's Stripe account
  const accountLink = await stripe.accountLinks.create({
    account: accountid,
    refresh_url: process.env.STRIPE_PUBLIC_DOMAIN + "/api/stripe/authorize",
    return_url: process.env.STRIPE_PUBLIC_DOMAIN + "/api/stripe/onboarded",
    type: "account_onboarding",
  });
  console.log("Account link ", accountLink);
  return accountLink;
}

async function onBoardStripe() {
  try {
    // Retrieve the user's Stripe account and check if they have finished onboarding
    console.log("On Boarded Stripe call");
    const account = await stripe.account.retrieve("acct_1NVmOcIquM8Jbwqu");
    //console.log("On Boarded Stripe call1", account);
    if (account.details_submitted) {
      // Redirect to the Rocket Rides dashboard
      //res.redirect('/hosts/dashboard');
    } else {
      console.log("The onboarding process was not completed.");
      //res.redirect('/hosts/signup');
    }
    //console.log(account);
    return account;
  } catch (err) {
    console.log("Failed to retrieve Stripe account information.");
    console.log(err);
  }
}

async function retrieveStripeAccountByAccountId(accountid) {
  try {
    // Retrieve the user's Stripe account and check if they have finished onboarding
    console.log("retrieve Stripe call");
    const account = await stripe.account.retrieve(accountid);
    //console.log("On Boarded Stripe call1", account);

    return account;
  } catch (err) {
    console.log("Failed to retrieve Stripe account information.");
    console.log(err);
  }
}

async function retrieveStripeBalanceByAccountId(accountid) {
  try {
    // Retrieve the user's Stripe account and check if they have finished onboarding
    console.log("retrieve Stripe balance");
    const account = await stripe.account.retrieve(accountid);
    //console.log("On Boarded Stripe call1", account);
    const balance = await stripe.balance.retrieve({
      stripeAccount: accountid,
    });
    return balance;
  } catch (err) {
    console.log("Failed to retrieve Stripe account information.");
    console.log(err);
  }
}

module.exports = {
  createStripeAccount,
  onBoardStripe,
  createStripeAccountLink,
  retrieveStripeAccountByAccountId,
  retrieveStripeBalanceByAccountId,
};
