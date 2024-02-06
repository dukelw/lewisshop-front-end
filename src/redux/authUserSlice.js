import { createSlice } from '@reduxjs/toolkit';

const authUserSlide = createSlice({
  name: 'authUser',
  initialState: {
    signin: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    signup: {
      isFetching: false,
      error: false,
      success: false,
    },
    logout: {
      isFetching: false,
      error: false,
    },
    getCart: {
      cart: null,
      isFetching: false,
      error: false,
    },
    addToCart: {
      addedProduct: null,
      isFetching: false,
      error: false,
    },
    deleteFromCart: {
      deletedProduct: null,
      isFetching: false,
      error: false,
    },
    updateCart: {
      updatedCart: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    userSigninStart: (state) => {
      state.signin.isFetching = true;
    },
    userSigninSuccess: (state, action) => {
      state.signin.isFetching = false;
      state.signin.currentUser = action.payload;
      state.signin.error = false;
    },
    userSigninFailure: (state) => {
      state.signin.isFetching = false;
      state.signin.error = true;
    },
    userSignupStart: (state) => {
      state.signup.isFetching = true;
    },
    userSignupSuccess: (state) => {
      state.signup.isFetching = false;
      state.signup.error = false;
      state.signup.success = true;
    },
    userSignupFailure: (state) => {
      state.signup.isFetching = false;
      state.signup.error = true;
      state.signup.success = false;
    },
    userLogoutStart: (state) => {
      state.signin.isFetching = true;
    },
    userLogoutSuccess: (state) => {
      state.signin.isFetching = false;
      state.signin.currentUser = null;
      state.signin.error = false;
    },
    userLogoutFailure: (state) => {
      state.signin.isFetching = false;
      state.signin.error = true;
    },
    getCartStart: (state) => {
      state.getCart.isFetching = true;
    },
    getCartSuccess: (state, action) => {
      state.getCart.isFetching = false;
      state.getCart.cart = action.payload;
      state.getCart.error = false;
    },
    getCartFailure: (state) => {
      state.getCart.isFetching = false;
      state.getCart.error = true;
    },
    addToCartStart: (state) => {
      state.addToCart.isFetching = true;
    },
    addToCartSuccess: (state, action) => {
      state.addToCart.isFetching = false;
      state.addToCart.addedProduct = action.payload;
      state.addToCart.error = false;
    },
    addToCartFailure: (state) => {
      state.addToCart.isFetching = false;
      state.addToCart.error = true;
    },
    deleteFromCartStart: (state) => {
      state.deleteFromCart.isFetching = true;
    },
    deleteFromCartSuccess: (state, action) => {
      state.deleteFromCart.isFetching = false;
      state.deleteFromCart.deletedProduct = action.payload;
      state.deleteFromCart.error = false;
    },
    deleteFromCartFailure: (state) => {
      state.deleteFromCart.isFetching = false;
      state.deleteFromCart.error = true;
    },
    updateCartStart: (state) => {
      state.updateCart.isFetching = true;
    },
    updateCartSuccess: (state, action) => {
      state.updateCart.isFetching = false;
      state.updateCart.updatedCart = action.payload;
      state.updateCart.error = false;
    },
    updateCartFailure: (state) => {
      state.updateCart.isFetching = false;
      state.updateCart.error = true;
    },
  },
});

export const {
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
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  deleteFromCartStart,
  deleteFromCartSuccess,
  deleteFromCartFailure,
  updateCartStart,
  updateCartSuccess,
  updateCartFailure,
} = authUserSlide.actions;
export default authUserSlide.reducer;
