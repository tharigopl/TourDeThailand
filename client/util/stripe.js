import axios from 'axios';

//const BACKEND_URL = 'https://uwunm-fe912-default-rtdb.firebaseio.com';

const BACKEND_URL =  'http://192.168.0.157:5000/api/stripe/link';

const BACKEND_URL_STRIPE = 'http://192.168.0.157:5000/api/stripe/';




export async function linkStripe(token) { 
    
    const stripeUserData = {};
    stripeUserData['business_type'] = 'individual';
    stripeUserData['email'] = 'dee9@gmail.com';  
    stripeUserData['country'] = 'US';
    stripeUserData['type'] = 'express';
    stripeUserData['individual'] = {
      'last_name' : 'LastNAme19',
      'first_name' : 'Fisrtnam9e1',
      'email': 'dee9@gmail.com'
    };
    console.log("Stripe js link stripe",token);
    const header = `Authorization: Bearer ${token}`;
    //const headers = { Authorization: `Bearer ${token}` };
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    const response = await axios.get(BACKEND_URL, config)
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }

    });
    console.log("#$#$#$adsasd 111221", response);
    //const id = response.data.name;
    return response.data;
}


export async function getStripeAccount(stripeaccountid) { 
    
  console.log("Stripe js get stripe account",stripeaccountid);
  
  //const headers = { Authorization: `Bearer ${token}` };
  const config = {
      headers: { Authorization: `Bearer ${token}` },
      params: {'stripeaccountid':stripeaccountid},
  };

  //const reqParam = {'stripeaccountid':stripeaccountid};


  const response = await axios.get(BACKEND_URL_STRIPE+'account', config)
  .catch(function (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

  });
  console.log("#$#$#$adsasd !!!!!!!!!!!", response.data);
  //const id = response.data.name;
  return response.data;
}

