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
  findUserStart,
  findUserSuccess,
  findUserFailure,
} from './authUserSlice';
import {
  addRecentProduct,
  findProductFailed,
  findProductStart,
  findProductSuccess,
  findProductsFailed,
  findProductsStart,
  findProductsSuccess,
  findRelateProductFailed,
  findRelateProductStart,
  findRelateProductSuccess,
  getProductsFailed,
  getProductsNoLimitFailed,
  getProductsNoLimitStart,
  getProductsNoLimitSuccess,
  getProductsStart,
  getProductsSuccess,
  resetRecentProduct,
  searchProductFailed,
  searchProductStart,
  searchProductSuccess,
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
  findAllShopsStart,
  findAllShopsFailed,
  findAllShopsSuccess,
} from './shopSlice';
import {
  cancelOrderFailed,
  cancelOrderStart,
  cancelOrderSuccess,
  checkoutFailed,
  checkoutStart,
  checkoutSuccess,
  createOrderFailed,
  createOrderStart,
  createOrderSuccess,
  findOrdersByShopFailed,
  findOrdersByShopStart,
  findOrdersByShopSuccess,
  findOrdersFailed,
  findOrdersStart,
  findOrdersSuccess,
  updateOrderStatusFailed,
  updateOrderStatusStart,
  updateOrderStatusSuccess,
} from './orderSlice';
import {
  createDiscountFailed,
  createDiscountStart,
  createDiscountSuccess,
  deleteDiscountFailed,
  deleteDiscountStart,
  deleteDiscountSuccess,
  destroyDiscountFailed,
  destroyDiscountStart,
  destroyDiscountSuccess,
  editDiscountFailed,
  editDiscountStart,
  editDiscountSuccess,
  findDeletedDiscountsFailed,
  findDeletedDiscountsStart,
  findDeletedDiscountsSuccess,
  findDiscountsFailed,
  findDiscountsStart,
  findDiscountsSuccess,
  restoreDiscountFailed,
  restoreDiscountStart,
  restoreDiscountSuccess,
} from './discountSlice';
import { showToast } from './toastSlice';
import { addToastsFailed, addToastsStart, addToastsSuccess, removeExpiredToasts } from './multiToastSlice';
import { paymentFailed, paymentStart, paymentSuccess } from './paymentSlice';
import {
  addAddressFailure,
  addAddressStart,
  addAddressSuccess,
  changePasswordFailure,
  changePasswordStart,
  changePasswordSuccess,
  updateAddressFailure,
  updateAddressStart,
  updateAddressSuccess,
  updateInfoFailure,
  updateInfoStart,
  updateInfoSuccess,
} from './userSlice';
import { uploadImageFailure, uploadImageStart, uploadImageSuccess } from './uploadSlice';
import {
  createCommentFailure,
  createCommentStart,
  createCommentSuccess,
  deleteCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  findCommentFailure,
  findCommentStart,
  findCommentSuccess,
  findReplyCommentStart,
  findReplyCommentSuccess,
} from './commentSlice';

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

export const getAllShops = async (accessToken, userID, dispatch, axiosJWT) => {
  dispatch(findAllShopsStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}shop/all`, {
      headers: { authorization: `${accessToken}`, user: `${userID}` },
    });
    dispatch(findAllShopsSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(findAllShopsFailed());
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

export const getAllProduct = async (pagination, dispatch) => {
  dispatch(getProductsStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}product?page=${pagination}`);
    dispatch(getProductsSuccess(res.data));
  } catch (error) {
    dispatch(getProductsFailed());
  }
};

export const getAllProductNoLimit = async (dispatch) => {
  dispatch(getProductsNoLimitStart());
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}product/all-product-no-limit`);
    dispatch(getProductsNoLimitSuccess(res.data));
  } catch (error) {
    dispatch(getProductsNoLimitFailed());
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
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}discount/create`, discount, {
      headers: { authorization: `${accessToken}`, user: `${shopID}` },
    });
    dispatch(createDiscountSuccess(res.data));
    navigate('/discounts');
  } catch (error) {
    dispatch(createDiscountFailed());
  }
};

export const updateDiscount = async (accessToken, shopID, discount, dispatch, navigate, axiosJWT) => {
  dispatch(editDiscountStart());
  try {
    const res = await axiosJWT.patch(`${REACT_APP_BASE_URL}discount/update/${discount.discount_code}`, discount, {
      headers: { authorization: `${accessToken}`, user: `${shopID}` },
    });
    dispatch(editDiscountSuccess(res.data));
    addToast({ message: 'Edit discount successfully', type: 'success', show: true }, dispatch);
  } catch (error) {
    dispatch(editDiscountFailed());
  }
};

export const updateUserInformation = async (accessToken, userID, data, dispatch, axiosJWT) => {
  dispatch(updateInfoStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}user/update`, data, {
      headers: { authorization: `${accessToken}`, user: `${userID}` },
    });
    dispatch(updateInfoSuccess(res.data));
    addToast({ message: 'Update information successfully', type: 'success', show: true }, dispatch);
    findUser(accessToken, userID, userID, dispatch, axiosJWT);
  } catch (error) {
    dispatch(updateInfoFailure());
  }
};

export const updateUserAddress = async (accessToken, userID, data, dispatch, axiosJWT) => {
  dispatch(updateAddressStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}user/update-address`, data, {
      headers: { authorization: `${accessToken}`, user: `${userID}` },
    });
    dispatch(updateAddressSuccess(res.data));
    findUser(accessToken, userID, userID, dispatch, axiosJWT);
  } catch (error) {
    dispatch(updateAddressFailure());
  }
};

export const updateUserAddressDefault = async (accessToken, userID, data, dispatch, axiosJWT) => {
  dispatch(updateAddressStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}user/update-address-default`, data, {
      headers: { authorization: `${accessToken}`, user: `${userID}` },
    });
    dispatch(updateAddressSuccess(res.data));
    findUser(accessToken, userID, userID, dispatch, axiosJWT);
  } catch (error) {
    dispatch(updateAddressFailure());
  }
};

export const changePassword = async (accessToken, userID, data, dispatch, navigate, axiosJWT) => {
  dispatch(changePasswordStart());
  try {
    await axiosJWT.post(`${REACT_APP_BASE_URL}user/change-password`, data, {
      headers: { authorization: `${accessToken}`, user: `${userID}` },
    });
    dispatch(changePasswordSuccess());
    userLogout(accessToken, userID, dispatch, navigate, axiosJWT);
  } catch (error) {
    dispatch(changePasswordFailure());
  }
};

export const addNewAddress = async (accessToken, userID, data, dispatch, axiosJWT) => {
  dispatch(addAddressStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}user/add-address`, data, {
      headers: { authorization: `${accessToken}`, user: `${userID}` },
    });
    dispatch(addAddressSuccess(res.data));
    findUser(accessToken, userID, userID, dispatch, axiosJWT);
  } catch (error) {
    dispatch(addAddressFailure());
  }
};

export const uploadImage = async (file, folderName, dispatch, axiosJWT) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folderName', folderName);
  dispatch(uploadImageStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}upload/thumb`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(uploadImageSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(uploadImageFailure());
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
    dispatch(resetRecentProduct());
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
    dispatch(resetRecentProduct());
    navigate('/user/signin');
  } catch (error) {
    dispatch(userLogoutFailure());
  }
};

export const findProductByID = async (productID, dispatch, axiosJWT) => {
  dispatch(findProductStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}product/id/${productID}`);
    dispatch(addRecentProduct(res.data));
    dispatch(findProductSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(findProductFailed());
  }
};

export const findProductsByID = async (productIDs, dispatch, axiosJWT) => {
  dispatch(findProductsStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}product/find-products`, productIDs);
    dispatch(findProductsSuccess(res.data));
  } catch (error) {
    dispatch(findProductsFailed());
  }
};

export const findRelateProduct = async (productType, dispatch, axiosJWT) => {
  dispatch(findRelateProductStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}product/type/${productType}`);
    dispatch(findRelateProductSuccess(res.data));
  } catch (error) {
    dispatch(findRelateProductFailed());
  }
};

export const findShopByID = async (shopID, dispatch, axiosJWT) => {
  dispatch(findShopStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}shop/${shopID}`);
    dispatch(findShopSuccess(res.data));
  } catch (error) {
    dispatch(findShopFailed());
  }
};

export const findCommentOfProduct = async (productID, page, dispatch, axiosJWT) => {
  dispatch(findCommentStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}comment/product?product_id=${productID}&page=${page}`);
    dispatch(findCommentSuccess(res.data));
  } catch (error) {
    dispatch(findCommentFailure());
  }
};

export const findReplyComment = async (productID, parentID, page, dispatch, axiosJWT) => {
  dispatch(findReplyCommentStart());
  try {
    const res = await axiosJWT.get(
      `${REACT_APP_BASE_URL}comment?parent_comment_id=${parentID}&product_id=${productID}&page=${page}`,
    );
    dispatch(findReplyCommentSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(findRelateProductFailed());
  }
};

export const createComment = async (accessToken, userID, page, data, dispatch, axiosJWT) => {
  dispatch(createCommentStart());
  try {
    await axiosJWT.post(`${REACT_APP_BASE_URL}comment`, data, {
      headers: { authorization: `${accessToken}`, user: `${userID}` },
    });
    dispatch(createCommentSuccess());
    findCommentOfProduct(data.product_id, page, dispatch, axiosJWT);
  } catch (error) {
    dispatch(createCommentFailure());
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

export const getUpdatedCart = async (accessToken, userID, dispatch, axiosJWT) => {
  dispatch(getCartStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}cart?user_id=${userID}`, {
      headers: { authorization: `${accessToken}`, user: userID },
    });
    dispatch(getCartSuccess(res.data));
  } catch (error) {
    dispatch(getCartFailure());
  }
};

export const getCartQuantity = async (accessToken, userID, dispatch, axiosJWT) => {
  dispatch(getCartStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}cart?user_id=${userID}`, {
      headers: { authorization: `${accessToken}`, user: userID },
    });
    dispatch(getCartSuccess(res.data));
  } catch (error) {
    dispatch(getCartFailure());
  }
};

export const searchProducts = async (keySearch, dispatch, axiosJWT) => {
  dispatch(searchProductStart());
  try {
    if (keySearch === '') return;
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}product/search/${keySearch}`);
    dispatch(searchProductSuccess(res.data));
  } catch (error) {
    dispatch(searchProductFailed());
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

export const deleteComment = async (accessToken, userID, page, data, dispatch, axiosJWT) => {
  dispatch(deleteCommentStart());
  try {
    await axiosJWT.delete(`${REACT_APP_BASE_URL}comment`, {
      data: data,
      headers: {
        authorization: accessToken,
        user: userID,
      },
    });
    dispatch(deleteCommentSuccess());
    findCommentOfProduct(data.product_id, page, dispatch, axiosJWT);
  } catch (error) {
    dispatch(deleteCommentFailure());
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

export const getAllOrders = async (accessToken, userID, dispatch, axiosJWT) => {
  dispatch(findOrdersStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}order/all`,
      { user_id: userID },
      {
        headers: { authorization: `${accessToken}`, user: userID },
      },
    );
    dispatch(findOrdersSuccess(res.data));
  } catch (error) {
    dispatch(findOrdersFailed());
  }
};

export const getAllOrdersByStatus = async (accessToken, userID, status, dispatch, axiosJWT) => {
  dispatch(findOrdersStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}order/find-status`,
      { user_id: userID, order_status: status },
      {
        headers: { authorization: `${accessToken}`, user: userID },
      },
    );
    dispatch(findOrdersSuccess(res.data));
  } catch (error) {
    dispatch(findOrdersFailed());
  }
};

export const updateOrderStatus = async (accessToken, shopID, orderID, action, dispatch, axiosJWT) => {
  dispatch(updateOrderStatusStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}order/update-status`,
      { shop_id: shopID, action, order_id: orderID },
      {
        headers: { authorization: `${accessToken}`, user: shopID },
      },
    );
    dispatch(updateOrderStatusSuccess(res.data));
    getOrdersByShop(accessToken, shopID, 'pending', dispatch, axiosJWT);
  } catch (error) {
    dispatch(updateOrderStatusFailed());
  }
};

export const getOrdersByShop = async (accessToken, shopID, status, dispatch, axiosJWT) => {
  dispatch(findOrdersByShopStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}order/find-pending`,
      { shop_id: shopID, order_status: status },
      {
        headers: { authorization: `${accessToken}`, user: shopID },
      },
    );
    dispatch(findOrdersByShopSuccess(res.data));
  } catch (error) {
    dispatch(findOrdersByShopFailed());
  }
};

export const cancelOrder = async (accessToken, userID, orderID, status, dispatch, axiosJWT) => {
  dispatch(cancelOrderStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}order/cancel`,
      { user_id: userID, order_id: orderID },
      {
        headers: { authorization: `${accessToken}`, user: userID },
      },
    );
    dispatch(cancelOrderSuccess(res.data));
    if (status === 'all') {
      getAllOrders(accessToken, userID, dispatch, axiosJWT);
    } else if (status === 'pending') {
      getAllOrdersByStatus(accessToken, userID, status, dispatch, axiosJWT);
    }
  } catch (error) {
    dispatch(cancelOrderFailed());
  }
};

export const order = async (accessToken, userID, data, dispatch, axiosJWT) => {
  dispatch(createOrderStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}order`, data, {
      headers: { authorization: `${accessToken}`, user: userID },
    });
    dispatch(createOrderSuccess(res.data));
    localStorage.removeItem('discountableCart');
  } catch (error) {
    dispatch(createOrderFailed());
  }
};

export const getDiscountsOfShopByUser = async (accessToken, userID, shopID, dispatch, axiosJWT) => {
  dispatch(findDiscountsStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}discount/discount-codes?discount_shop_id=${shopID}`, {
      headers: { authorization: `${accessToken}`, user: userID },
    });
    dispatch(findDiscountsSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(findDiscountsFailed());
  }
};

export const getDeletedDiscounts = async (accessToken, shopID, dispatch, axiosJWT) => {
  dispatch(findDeletedDiscountsStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_BASE_URL}discount/deleted-codes`, {
      headers: { authorization: `${accessToken}`, user: shopID },
    });
    dispatch(findDeletedDiscountsSuccess(res.data));
  } catch (error) {
    dispatch(findDeletedDiscountsFailed());
  }
};

export const getDiscountsOfShopsByUser = async (accessToken, userID, shopIDs, dispatch, axiosJWT) => {
  dispatch(findDiscountsStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}discount/codes-of-shops`,
      { discount_shop_ids: shopIDs, user_id: userID },
      {
        headers: { authorization: `${accessToken}`, user: userID },
      },
    );
    dispatch(findDiscountsSuccess(res.data));
  } catch (error) {
    dispatch(findDiscountsFailed());
  }
};

export const findUser = async (accessToken, shopID, userID, dispatch, axiosJWT) => {
  dispatch(findUserStart());
  try {
    const res = await axiosJWT.post(
      `${REACT_APP_BASE_URL}user/find`,
      { user_id: userID },
      {
        headers: { authorization: `${accessToken}`, user: shopID },
      },
    );
    dispatch(findUserSuccess(res.data));
  } catch (error) {
    dispatch(findUserFailure());
  }
};

export const deleteDiscount = async (accessToken, shopID, discountCode, dispatch, axiosJWT) => {
  dispatch(deleteDiscountStart());
  try {
    await axiosJWT.delete(`${REACT_APP_BASE_URL}discount/delete/${discountCode}`, {
      headers: { authorization: `${accessToken}`, user: shopID },
    });
    dispatch(deleteDiscountSuccess());
    getDeletedDiscounts(accessToken, shopID, dispatch, axiosJWT);
    getDiscountsOfShopByUser(accessToken, shopID, shopID, dispatch, axiosJWT);
  } catch (error) {
    dispatch(deleteDiscountFailed());
  }
};

export const destroyDiscount = async (accessToken, shopID, discountID, dispatch, axiosJWT) => {
  dispatch(destroyDiscountStart());
  try {
    await axiosJWT.delete(`${REACT_APP_BASE_URL}discount/destroy/${discountID}`, {
      headers: { authorization: `${accessToken}`, user: shopID },
    });
    dispatch(destroyDiscountSuccess());
    getDeletedDiscounts(accessToken, shopID, dispatch, axiosJWT);
    getDiscountsOfShopByUser(accessToken, shopID, shopID, dispatch, axiosJWT);
  } catch (error) {
    dispatch(destroyDiscountFailed());
  }
};

export const restoreDiscount = async (accessToken, shopID, discountID, dispatch, axiosJWT) => {
  dispatch(restoreDiscountStart());
  try {
    await axiosJWT.post(
      `${REACT_APP_BASE_URL}discount/restore/${discountID}`,
      {},
      {
        headers: { authorization: `${accessToken}`, user: shopID },
      },
    );
    dispatch(restoreDiscountSuccess());
    getDiscountsOfShopByUser(accessToken, shopID, shopID, dispatch, axiosJWT);
    getDeletedDiscounts(accessToken, shopID, dispatch, axiosJWT);
  } catch (error) {
    dispatch(restoreDiscountFailed());
  }
};

export const addToast = async (toastData, dispatch) => {
  dispatch(addToastsStart());
  try {
    dispatch(showToast({ ...toastData }));
    dispatch(addToastsSuccess({ ...toastData }));
    setTimeout(() => {
      dispatch(removeExpiredToasts());
    }, 1500);
  } catch (error) {
    dispatch(addToastsFailed());
  }
};

export const payment = async (accessToken, userID, amount, dispatch, navigate, axiosJWT) => {
  dispatch(paymentStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_BASE_URL}payment/momo`, amount, {
      headers: { authorization: `${accessToken}`, user: userID },
    });
    dispatch(paymentSuccess(res.data));
    // Mở liên kết trong tab mới
    window.open(res?.data?.metadata.payUrl, '_blank');
  } catch (error) {
    dispatch(paymentFailed());
  }
};
