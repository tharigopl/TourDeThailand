import axios from 'axios';

const API_DOMAIN = 'happykid-396701.uc.r.appspot.com';

//const API_DOMAIN = process.env.EXPO_PUBLIC_API_DOMAIN;
//const API_DOMAIN = '192.168.0.165';
//const API_DOMAIN = '192.168.0.82';
//const BACKEND_URL = 'https://uwunm-fe912-default-rtdb.firebaseio.com';

const BACKEND_URL =  `https://${API_DOMAIN}/api/stripe/link`;

const BACKEND_URL_STRIPE = `https://${API_DOMAIN}/api/stripe/`;




export async function linkStripe(token) { 
    
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
    console.log("#$#$#$adsasd linkStripe", response.data);
    //const id = response.data.name;
    return response.data;
}


export async function getStripeAccount(token, stripeaccountid) { 
    
  console.log("Stripe js get stripe account xxxx",stripeaccountid);
  
  //const headers = { Authorization: `Bearer ${token}` };
  // const config = {
  //    // headers: { Authorization: `Bearer ${token}` },
  //     params: {stripeaccountid:stripeaccountid}
  // };

  //const reqParam = {'stripeaccountid':stripeaccountid};

console.log("config");
  const response = await axios.get(BACKEND_URL_STRIPE+'account/'+stripeaccountid)
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
  console.log("#$#$#$adsasd getStripeAccount", response.data);
  //const id = response.data.name;
  return response.data;
}

