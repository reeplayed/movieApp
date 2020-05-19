import { SET_USER, LOGOUT_USER, SET_SINGIN_OR_SINGUP_VIEW } from './types';
import axios from '../axios';
import jwtDecode from 'jwt-decode';

export const setUser = (ownAccessToken, googleAccessToken) => dispatch => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + ownAccessToken;
  console.log(jwtDecode(ownAccessToken));
  dispatch({
    type: SET_USER,
    payload: jwtDecode(ownAccessToken),
  });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  delete axios.defaults.headers.common['Authorization'];

  dispatch({
    type: LOGOUT_USER,
  });
};

export const setSingInUpView = view => {
  return {
    type: SET_SINGIN_OR_SINGUP_VIEW,
    payload: view,
  };
};
