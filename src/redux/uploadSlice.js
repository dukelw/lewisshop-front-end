import { createSlice } from '@reduxjs/toolkit';

const uploadSlide = createSlice({
  name: 'upload',
  initialState: {
    uploadImage: {
      uploadedImage: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    uploadImageStart: (state) => {
      state.uploadImage.isFetching = true;
    },
    uploadImageSuccess: (state, action) => {
      state.uploadImage.isFetching = false;
      state.uploadImage.uploadedImage = action.payload;
      state.uploadImage.error = false;
    },
    uploadImageFailure: (state) => {
      state.uploadImage.isFetching = false;
      state.uploadImage.error = true;
    },
  },
});

export const { uploadImageStart, uploadImageSuccess, uploadImageFailure } = uploadSlide.actions;
export default uploadSlide.reducer;
