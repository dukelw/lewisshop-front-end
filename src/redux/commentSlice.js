import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    find: {
      foundComment: null,
      isFetching: false,
      error: false,
    },
    create: {
      createdComment: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    findCommentStart: (state) => {
      state.find.isFetching = true;
    },
    findCommentSuccess: (state, action) => {
      state.find.isFetching = false;
      state.find.foundComment = action.payload;
      state.find.error = false;
    },
    findCommentFailure: (state) => {
      state.find.isFetching = false;
      state.find.error = true;
    },
    createCommentStart: (state) => {
      state.create.isFetching = true;
    },
    createCommentSuccess: (state, action) => {
      state.create.isFetching = false;
      state.create.createdComment = action.payload;
      state.create.error = false;
    },
    createCommentFailure: (state) => {
      state.create.isFetching = false;
      state.create.error = true;
    },
  },
});

export const {
  findCommentStart,
  findCommentSuccess,
  findCommentFailure,
  createCommentStart,
  createCommentSuccess,
  createCommentFailure,
} = commentSlice.actions;
export default commentSlice.reducer;
