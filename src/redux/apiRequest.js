import axios from 'axios';
import { signinStart, signinSuccess, signinFailure, signupStart, signupSuccess, signupFailure } from './authSlice';
import { getProductsFailed, getProductsStart, getProductsSuccess } from './productSlice';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const signinShop = async (user, dispatch, navigate) => {
  dispatch(signinStart());
  try {
    const res = await axios.post(`${REACT_APP_BASE_URL}shop/signin`, user);
    dispatch(signinSuccess(res.data));
    navigate('/');
  } catch (error) {
    dispatch(signinFailure());
  }
};

export const signupShop = async (user, dispatch, navigate) => {
  dispatch(signupStart());
  try {
    await axios.post(`${REACT_APP_BASE_URL}shop/signup`, user);
    dispatch(signupSuccess());
    navigate('/product/signin');
  } catch (error) {
    dispatch(signupFailure());
  }
};

export const getAllDraftsOfShop = async (accessToken, productID, dispatch) => {
  dispatch(getProductsStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}product/draft/all`, {
      headers: { authorization: `${accessToken}`, user: `${productID}` },
    });
    dispatch(getProductsSuccess(res.data));
  } catch (error) {
    dispatch(getProductsFailed());
  }
};
