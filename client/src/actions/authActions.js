import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => {
  axios
    .post('/api/users/register', userData)
    .then(res => true);
};

// Login - Get User Token
export const loginUser = userData => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
    })
    .catch(err => console.log(err));
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
