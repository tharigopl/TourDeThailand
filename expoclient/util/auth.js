import axios from 'axios';

const API_KEY = 'AIzaSyDK6dLf66nFmxkJb58V5YMaZwvQYigadOU';

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
console.log("response.data ", response.data.email);
  const token = response.data.idToken;

  return token;
}

async function tdtauthenticate(mode, email, password) {
  var url = `http://localhost:3000/login`;
  console.log("POST1111");
  if(mode == 'signUp'){
    console.log("Signup1");
    url = 'http://localhost:3000/signup';
  }
  console.log(url)
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
console.log("response.data ", response);
  const token = response;

  return token;
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}

export function logintdtserver(email, password) {
  return tdtauthenticate('signInWithPassword', email, password);
}

export function createUserTdtServer(email, password) {
  return tdtauthenticate('signUp', email, password);
}