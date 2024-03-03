import { createSlice } from '@reduxjs/toolkit';

const userSlide = createSlice({
  name: 'user',
  initialState: {
    updateInfo: {
      updatedUser: null,
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
  },
});

export const { updateInfoStart, updateInfoSuccess, updateInfoFailure } = userSlide.actions;
export default userSlide.reducer;
