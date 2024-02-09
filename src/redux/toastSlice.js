import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: 'success',
  show: false,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.show = action.payload.show;
    },
    hideToast(state) {
      state.show = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
