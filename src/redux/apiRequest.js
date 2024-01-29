import axios from 'axios';
import { signinStart, signinSuccess, signinFailure, signupStart, signupSuccess, signupFailure } from './authShopSlice';
import { getProductsFailed, getProductsStart, getProductsSuccess } from './productSlice';
import {
  createProductStart,
  createProductSuccess,
  createProductFailed,
  publishProductSuccess,
  publishProductFailed,
  publishProductStart,
  unpublishProductStart,
  unpublishProductSuccess,
  unpublishProductFailed,
} from './shopSlice';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const signinShop = async (shop, dispatch, navigate) => {
  dispatch(signinStart());
  try {
    const res = await axios.post(`${REACT_APP_BASE_URL}shop/signin`, shop);
    const refreshToken = res.data.metadata.tokens.refreshToken;
    localStorage.setItem('refreshToken', refreshToken);
    dispatch(signinSuccess(res.data));
    navigate('/shop/home');
  } catch (error) {
    dispatch(signinFailure());
  }
};

export const signupShop = async (shop, dispatch, navigate) => {
  dispatch(signupStart());
  try {
    const res = await axios.post(`${REACT_APP_BASE_URL}shop/signup`, shop);
    const refreshToken = res.data.metadata.tokens.refreshToken;
    localStorage.setItem('refreshToken', refreshToken);
    dispatch(signupSuccess());
    navigate('/shop/signin');
  } catch (error) {
    dispatch(signupFailure());
  }
};

export const getAllDraftsOfShop = async (accessToken, shopID, dispatch, axiosJWT) => {
  dispatch(getProductsStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}product/draft/all`, {
      headers: { authorization: `${accessToken}`, user: `${shopID}` },
    });
    dispatch(getProductsSuccess(res.data));
  } catch (error) {
    dispatch(getProductsFailed());
  }
};

export const getAllPublishOfShop = async (accessToken, shopID, dispatch, axiosJWT) => {
  dispatch(getProductsStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}product/publish/all`, {
      headers: { authorization: `${accessToken}`, user: `${shopID}` },
    });
    dispatch(getProductsSuccess(res.data));
  } catch (error) {
    dispatch(getProductsFailed());
  }
};

export const createNewProduct = async (accessToken, shopID, product, dispatch, navigate, axiosJWT) => {
  dispatch(createProductStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}product/create`, product, {
      headers: { authorization: `${accessToken}`, user: `${shopID}` },
    });
    dispatch(createProductSuccess(res.data));
    navigate('/shop/draft');
  } catch (error) {
    dispatch(createProductFailed());
  }
};

export const publishProduct = async (accessToken, shopID, productID, dispatch, navigate, axiosJWT) => {
  dispatch(publishProductStart());
  try {
    await axiosJWT.post(
      `${REACT_APP_BASE_URL}product/publish/${productID}`,
      {}, // Dữ liệu gửi đi rỗng trong trường hợp này
      {
        headers: {
          authorization: accessToken,
          user: shopID,
        },
      },
    );
    dispatch(publishProductSuccess());
    navigate('.', { replace: true });
  } catch (error) {
    dispatch(publishProductFailed());
  }
};

export const unpublishProduct = async (accessToken, shopID, productID, dispatch, navigate, axiosJWT) => {
  dispatch(unpublishProductStart());
  try {
    await axiosJWT.post(
      `${REACT_APP_BASE_URL}product/unpublish/${productID}`,
      {}, // Dữ liệu gửi đi rỗng trong trường hợp này
      {
        headers: {
          authorization: accessToken,
          user: shopID,
        },
      },
    );
    dispatch(unpublishProductSuccess());
    navigate('.', { replace: true });
  } catch (error) {
    dispatch(unpublishProductFailed());
  }
};
