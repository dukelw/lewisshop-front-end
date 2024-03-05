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
} = userSlide.actions;
export default userSlide.reducer;
