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
  },
  reducers: {
    signinStart: (state) => {
      state.signin.isFetching = true;
    },
    signinSuccess: (state, action) => {
      console.log('sign in success');
      state.signin.isFetching = false;
      state.signin.currentShop = action.payload;
      state.signin.error = false;
      console.log(`current Shop`, state.signin.currentShop);
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
  },
});

export const { signinStart, signinSuccess, signinFailure, signupStart, signupSuccess, signupFailure } =
  authShopSlide.actions;
export default authShopSlide.reducer;
