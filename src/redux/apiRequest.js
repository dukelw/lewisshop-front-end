import axios from 'axios';
import { signinStart, signinSuccess, signinFailure, signupStart, signupSuccess, signupFailure } from './authSlide';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const signinUser = async (user, dispatch, navigate) => {
  dispatch(signinStart());
  try {
    const res = await axios.post(`${REACT_APP_BASE_URL}shop/signin`, user);
    dispatch(signinSuccess(res.data));
    navigate('/');
  } catch (error) {
    dispatch(signinFailure());
  }
};

export const signupUser = async (user, dispatch, navigate) => {
  dispatch(signupStart());
  try {
    await axios.post(`${REACT_APP_BASE_URL}shop/signup`, user);
    dispatch(signupSuccess());
    navigate('/shop/signin');
  } catch (error) {
    dispatch(signupFailure());
  }
};
