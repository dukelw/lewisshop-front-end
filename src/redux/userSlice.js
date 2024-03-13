import { createSlice } from '@reduxjs/toolkit';

const userSlide = createSlice({
  name: 'user',
  initialState: {
    updateInfo: {
      updatedUser: null,
      isFetching: false,
      error: false,
    },
    updateAddress: {
      updatedUser: null,
      isFetching: false,
      error: false,
    },
    addAddress: {
      updatedUser: null,
      isFetching: false,
      error: false,
    },
    changePassword: {
      isFetching: false,
      error: false,
    },
    addFavourite: {
      isFetching: false,
      error: false,
    },
    getFavourite: {
      products: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    updateInfoStart: (state) => {
      state.updateInfo.isFetching = true;
    },
    updateInfoSuccess: (state, action) => {
      state.updateInfo.isFetching = false;
      state.updateInfo.updatedUser = action.payload;
      state.updateInfo.error = false;
    },
    updateInfoFailure: (state) => {
      state.updateInfo.isFetching = false;
      state.updateInfo.error = true;
    },
    updateAddressStart: (state) => {
      state.updateAddress.isFetching = true;
    },
    updateAddressSuccess: (state, action) => {
      state.updateAddress.isFetching = false;
      state.updateAddress.updatedUser = action.payload;
      state.updateAddress.error = false;
    },
    updateAddressFailure: (state) => {
      state.updateAddress.isFetching = false;
      state.updateAddress.error = true;
    },
    addAddressStart: (state) => {
      state.addAddress.isFetching = true;
    },
    addAddressSuccess: (state, action) => {
      state.addAddress.isFetching = false;
      state.addAddress.updatedUser = action.payload;
      state.addAddress.error = false;
    },
    addAddressFailure: (state) => {
      state.addAddress.isFetching = false;
      state.addAddress.error = true;
    },
    changePasswordStart: (state) => {
      state.changePassword.isFetching = true;
    },
    changePasswordSuccess: (state) => {
      state.changePassword.isFetching = false;
      state.changePassword.error = false;
    },
    changePasswordFailure: (state) => {
      state.changePassword.isFetching = false;
      state.changePassword.error = true;
    },
    addFavouriteStart: (state) => {
      state.addFavourite.isFetching = true;
    },
    addFavouriteSuccess: (state) => {
      state.addFavourite.isFetching = false;
      state.addFavourite.error = false;
    },
    addFavouriteFailure: (state) => {
      state.addFavourite.isFetching = false;
      state.addFavourite.error = true;
    },
    getFavouriteStart: (state) => {
      state.getFavourite.isFetching = true;
    },
    getFavouriteSuccess: (state, action) => {
      state.getFavourite.isFetching = false;
      state.getFavourite.products = action.payload;
      state.getFavourite.error = false;
    },
    getFavouriteFailure: (state) => {
      state.getFavourite.isFetching = false;
      state.getFavourite.error = true;
    },
  },
});

export const {
  updateInfoStart,
  updateInfoSuccess,
  updateInfoFailure,
  updateAddressStart,
  updateAddressSuccess,
  updateAddressFailure,
  addAddressStart,
  addAddressSuccess,
  addAddressFailure,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
  addFavouriteStart,
  addFavouriteSuccess,
  addFavouriteFailure,
  getFavouriteStart,
  getFavouriteSuccess,
  getFavouriteFailure,
} = userSlide.actions;
export default userSlide.reducer;
