import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  email:'',
  id:'',
  stripeuserid:'',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  saveStripeUserId: (stripeuserid) => {},
  removeStripeUserId: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [stripeUserId, setStripeUserId] = useState();

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  function removeStripeUserId(){
    setStripeUserId(null);
    AsyncStorage.removeItem('stripeuserid');
  }

  function saveStripeUserId(stripeuserid){
    setStripeUserId(stripeuserid);
    AsyncStorage.setItem('stripeuserid');
  }

  const value = {
    token: authToken,
    stripeuserid:stripeUserId,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    saveStripeUserId:saveStripeUserId,
    removeStripeUserId:removeStripeUserId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
