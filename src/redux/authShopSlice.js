import { createSlice } from '@reduxjs/toolkit';

const authShopSlide = createSlice({
  name: 'authShop',
  initialState: {
    signin: {
      currentShop: null,
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
  },
  reducers: {
    signinStart: (state) => {
      state.signin.isFetching = true;
    },
    signinSuccess: (state, action) => {
      state.signin.isFetching = false;
      state.signin.currentShop = action.payload;
      state.signin.error = false;
    },
    signinFailure: (state) => {
      state.signin.isFetching = false;
      state.signin.error = true;
    },
    signupStart: (state) => {
      state.signup.isFetching = true;
    },
    signupSuccess: (state) => {
      state.signup.isFetching = false;
      state.signup.error = false;
      state.signup.success = true;
    },
    signupFailure: (state) => {
      state.signup.isFetching = false;
      state.signup.error = true;
      state.signup.success = false;
    },
    logoutStart: (state) => {
      state.signin.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.signin.isFetching = false;
      state.signin.currentShop = null;
      state.signin.error = false;
    },
    logoutFailure: (state) => {
      state.signin.isFetching = false;
      state.signin.error = true;
    },
  },
});

export const {
  signinStart,
  signinSuccess,
  signinFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = authShopSlide.actions;
export default authShopSlide.reducer;
