import { createSlice } from '@reduxjs/toolkit';

const multiToastSlice = createSlice({
  name: 'multiToast',
  initialState: {
    multiToasts: {
      allToasts: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    addToastsStart: (state) => {
      state.multiToasts.isFetching = true;
    },
    addToastsSuccess: (state, action) => {
      state.multiToasts.isFetching = false;
      state.multiToasts.allToasts.push(action.payload);
    },
    addToastsFailed: (state) => {
      state.multiToasts.isFetching = false;
      state.multiToasts.error = true;
    },
    removeExpiredToasts: (state) => {
      state.multiToasts.allToasts.shift();
    },
    removeToast: (state, action) => {
      state.multiToasts.allToasts.splice(action.payload, 1)
    }
  },
});

export const { addToastsStart, addToastsSuccess, addToastsFailed, removeExpiredToasts, removeToast } = multiToastSlice.actions;

export default multiToastSlice.reducer;
