import axios from 'axios';
import {
  signinStart,
  signinSuccess,
  signinFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logoutStart,
  logoutFailure,
  logoutSuccess,
} from './authShopSlice';
import {
  userSigninStart,
  userSigninSuccess,
  userSigninFailure,
  userSignupStart,
  userSignupSuccess,
  userSignupFailure,
  userLogoutStart,
  userLogoutSuccess,
  userLogoutFailure,
  getCartStart,
  getCartSuccess,
  getCartFailure,
  addToCartSuccess,
  addToCartStart,
  addToCartFailure,
  deleteFromCartStart,
  deleteFromCartSuccess,
  deleteFromCartFailure,
  updateCartStart,
  updateCartSuccess,
  updateCartFailure,
} from './authUserSlice';
import {
  findProductFailed,
  findProductStart,
  findProductSuccess,
  getProductsFailed,
  getProductsStart,
  getProductsSuccess,
} from './productSlice';
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
  updateProductStart,
  updateProductSuccess,
  updateProductFailed,
  findShopStart,
  findShopSuccess,
  findShopFailed,
} from './shopSlice';
import { checkoutFailed, checkoutStart, checkoutSuccess } from './orderSlice';
import {
  createDiscountFailed,
  createDiscountStart,
  createDiscountSuccess,
  findDiscountsFailed,
  findDiscountsStart,
  findDiscountsSuccess,
} from './discountSlice';
import { hideToast, showToast } from './toastSlice';
import { addToastsFailed, addToastsStart, addToastsSuccess, removeExpiredToasts } from './multiToastSlice';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const signinShop = async (shop, dispatch, navigate) => {
  dispatch(signinStart());
  try {
    const res = await axios.post(`${REACT_APP_BASE_URL}shop/signin`, shop);
    const refreshToken = res.data.metadata.tokens.refreshToken;
    localStorage.setItem('refreshToken', refreshToken);
    dispatch(signinSuccess(res.data));
    navigate('/shop');
  } catch (error) {
    dispatch(signinFailure());
  }
};

export const signupShop = async (shop, dispatch, navigate) => {
  dispatch(signupStart());
  try {
    const res = await axios.post(`${REACT_APP_BASE_URL}shop/signup`, shop);
    const refreshToken = res.data?.metadata?.metadata?.tokens?.refreshToken;
    localStorage.setItem('refreshToken', refreshToken);
    dispatch(signupSuccess());
    navigate('/shop/signin');
  } catch (error) {
    dispatch(signupFailure());
  }
};

export const signinUser = async (user, dispatch, navigate) => {
  dispatch(userSigninStart());
  try {
    const res = await axios.post(`${REACT_APP_BASE_URL}user/signin`, user);
    const refreshToken = res.data.metadata.tokens.refreshToken;
    localStorage.setItem('refreshToken', refreshToken);
    dispatch(userSigninSuccess(res.data));
    navigate('/');
  } catch (error) {
    dispatch(userSigninFailure());
  }
};

export const signupUser = async (user, dispatch, navigate) => {
  dispatch(userSignupStart());
  try {
    const res = await axios.post(`${REACT_APP_BASE_URL}user/signup`, user);
    const refreshToken = res.data?.metadata?.metadata?.tokens?.refreshToken;
    localStorage.setItem('refreshToken', refreshToken);
    dispatch(userSignupSuccess());
    navigate('/user/signin');
  } catch (error) {
    dispatch(userSignupFailure());
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

export const getAllProductOfShop = async (accessToken, shopID, dispatch, axiosJWT) => {
  dispatch(getProductsStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}product?shop_id=${shopID}`, {
      headers: { authorization: `${accessToken}`, user: `${shopID}` },
    });
    dispatch(getProductsSuccess(res.data));
  } catch (error) {
    dispatch(getProductsFailed());
  }
};

export const getAllProduct = async (dispatch) => {
  dispatch(getProductsStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}product`);
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

export const createNewDiscount = async (accessToken, shopID, discount, dispatch, navigate, axiosJWT) => {
  dispatch(createDiscountStart());
  try {
    console.log(accessToken, shopID, discount);
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}discount/create`, discount, {
      headers: { authorization: `${accessToken}`, user: `${shopID}` },
    });
    dispatch(createDiscountSuccess(res.data));
    // navigate('/shop/discount');
  } catch (error) {
    dispatch(createDiscountFailed());
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
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}product/draft/all`, {
      headers: { authorization: `${accessToken}`, user: `${shopID}` },
    });
    dispatch(getProductsSuccess(res.data));
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
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}product/publish/all`, {
      headers: { authorization: `${accessToken}`, user: `${shopID}` },
    });
    dispatch(getProductsSuccess(res.data));
    navigate('.', { replace: true });
  } catch (error) {
    dispatch(unpublishProductFailed());
  }
};

export const logout = async (accessToken, shopID, dispatch, navigate, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post(
      `${REACT_APP_BASE_URL}shop/logout`,
      {}, // Dữ liệu gửi đi rỗng trong trường hợp này
      {
        headers: {
          authorization: accessToken,
          user: shopID,
        },
      },
    );
    dispatch(logoutSuccess());
    dispatch(getProductsFailed()); // help Shop Home stop render published product
    navigate('/shop/signin');
  } catch (error) {
    dispatch(logoutFailure());
  }
};

export const userLogout = async (accessToken, userID, dispatch, navigate, axiosJWT) => {
  dispatch(userLogoutStart());
  try {
    await axiosJWT.post(
      `${REACT_APP_BASE_URL}user/logout`,
      {}, // Dữ liệu gửi đi rỗng trong trường hợp này
      {
        headers: {
          authorization: accessToken,
          user: userID,
        },
      },
    );
    dispatch(userLogoutSuccess());
    navigate('/user/signin');
  } catch (error) {
    dispatch(userLogoutFailure());
  }
};

export const findProductByID = async (accessToken, shopID, productID, dispatch, axiosJWT) => {
  dispatch(findProductStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}product/${productID}`, {
      headers: { authorization: `${accessToken}`, user: `${shopID}` },
    });
    dispatch(findProductSuccess(res.data));
  } catch (error) {
    dispatch(findProductFailed());
  }
};

export const findShopByID = async (accessToken, userID, shopID, dispatch, axiosJWT) => {
  dispatch(findShopStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}shop/find`, shopID, {
      headers: { authorization: `${accessToken}`, user: `${userID}` },
    });
    dispatch(findShopSuccess(res.data));
  } catch (error) {
    dispatch(findShopFailed());
  }
};

export const editProduct = async (accessToken, shopID, productID, product, dispatch, navigate, axiosJWT) => {
  dispatch(updateProductStart());
  try {
    await axiosJWT.patch(`${REACT_APP_BASE_URL}product/update/${productID}`, product, {
      headers: { authorization: `${accessToken}`, user: `${shopID}` },
    });
    dispatch(updateProductSuccess());
    navigate('/shop');
  } catch (error) {
    dispatch(updateProductFailed());
  }
};

// User
export const getCartByUserID = async (accessToken, userID, dispatch, navigate, axiosJWT) => {
  dispatch(getCartStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}cart?user_id=${userID}`, {
      headers: { authorization: `${accessToken}`, user: userID },
    });
    dispatch(getCartSuccess(res.data));
    navigate('/cart');
  } catch (error) {
    dispatch(getCartFailure());
  }
};

export const addProductToCart = async (accessToken, userID, products, dispatch, axiosJWT) => {
  dispatch(addToCartStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}cart`, products, {
      headers: { authorization: `${accessToken}`, user: userID },
    });
    dispatch(addToCartSuccess(res.data));
  } catch (error) {
    dispatch(addToCartFailure());
  }
};

export const updateProductInCart = async (accessToken, userID, product, dispatch, axiosJWT) => {
  dispatch(updateCartStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}cart/update`, product, {
      headers: { authorization: `${accessToken}`, user: userID },
    });
    dispatch(updateCartSuccess(res.data));
    const response = await axiosJWT.get(`${REACT_APP_BASE_URL}cart?user_id=${userID}`, {
      headers: { authorization: `${accessToken}`, user: userID },
    });
    dispatch(getCartSuccess(response.data));
  } catch (error) {
    dispatch(updateCartFailure());
  }
};

export const deleteProductInCartByID = async (accessToken, userID, data, dispatch, axiosJWT) => {
  dispatch(deleteFromCartStart());
  try {
    const res = await axiosJWT.delete(`${REACT_APP_BASE_URL}cart`, {
      data: data,
      headers: {
        authorization: accessToken,
        user: userID,
      },
    });
    dispatch(deleteFromCartSuccess(res.data));
    const response = await axiosJWT.get(`${REACT_APP_BASE_URL}cart?user_id=${userID}`, {
      headers: { authorization: `${accessToken}`, user: userID },
    });
    dispatch(getCartSuccess(response.data));
  } catch (error) {
    dispatch(deleteFromCartFailure());
  }
};

export const checkout = async (accessToken, userID, data, dispatch, axiosJWT) => {
  dispatch(checkoutStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}order/review`, data, {
      headers: { authorization: `${accessToken}`, user: userID },
    });
    dispatch(checkoutSuccess(res.data));
  } catch (error) {
    dispatch(checkoutFailed());
  }
};

export const getDiscountsOfShopByUser = async (accessToken, userID, shopID, dispatch, axiosJWT) => {
  dispatch(findDiscountsStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}discount/discount-codes?discount_shop_id=${shopID}`, {
      headers: { authorization: `${accessToken}`, user: userID },
    });
    dispatch(findDiscountsSuccess(res.data));
  } catch (error) {
    dispatch(findDiscountsFailed());
  }
};

export const getDiscountsOfShopsByUser = async (accessToken, userID, shopIDs, dispatch, axiosJWT) => {
  dispatch(findDiscountsStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}discount/codes-of-shops`,
      { discount_shop_ids: shopIDs },
      {
        headers: { authorization: `${accessToken}`, user: userID },
      },
    );
    dispatch(findDiscountsSuccess(res.data));
  } catch (error) {
    dispatch(findDiscountsFailed());
  }
};

export const addToast = async (toastData, dispatch) => {
  dispatch(addToastsStart());
  try {
    dispatch(showToast({ ...toastData }));
    dispatch(addToastsSuccess({ ...toastData }));
    setTimeout(() => {
      dispatch(removeExpiredToasts());
    }, 3000);
  } catch (error) {
    dispatch(addToastsFailed());
  }
};
