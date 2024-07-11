import { createSlice } from '@reduxjs/toolkit';

const messageSlide = createSlice({
  name: 'message',
  initialState: {
    getHistoryMessage: {
      messages: null,
      isFetching: false,
      error: false,
    },
    getAllNonReadUserMessages: {
      messages: null,
      isFetching: false,
      error: false,
    },
    markReadMessage: {
      isFetching: false,
      error: false,
    },
    nonReadMessage: {
      isFetching: false,
      messages: null,
      error: false,
    },
  },
  reducers: {
    getHistoryMessageStart: (state) => {
      state.getHistoryMessage.isFetching = true;
    },
    getHistoryMessageSuccess: (state, action) => {
      state.getHistoryMessage.isFetching = false;
      state.getHistoryMessage.messages = action.payload;
      state.getHistoryMessage.error = false;
    },
    getHistoryMessageFailed: (state) => {
      state.getHistoryMessage.isFetching = false;
      state.getHistoryMessage.error = true;
    },
    getAllNonReadUserMessagesStart: (state) => {
      state.getAllNonReadUserMessages.isFetching = true;
    },
    getAllNonReadUserMessagesSuccess: (state, action) => {
      state.getAllNonReadUserMessages.isFetching = false;
      state.getAllNonReadUserMessages.messages = action.payload;
      state.getAllNonReadUserMessages.error = false;
    },
    getAllNonReadUserMessagesFailed: (state) => {
      state.getAllNonReadUserMessages.isFetching = false;
      state.getAllNonReadUserMessages.error = true;
    },
    markReadMessagesStart: (state) => {
      state.markReadMessage.isFetching = true;
    },
    markReadMessageSuccess: (state) => {
      state.markReadMessage.isFetching = false;
      state.markReadMessage.error = false;
    },
    markReadMessageFailed: (state) => {
      state.markReadMessage.isFetching = false;
      state.markReadMessage.error = true;
    },
    getNonReadStart: (state) => {
      state.nonReadMessage.isFetching = true;
    },
    getNonReadSuccess: (state, action) => {
      state.nonReadMessage.isFetching = false;
      state.nonReadMessage.messages = action.payload;
      state.nonReadMessage.error = false;
    },
    getNonReadFailed: (state) => {
      state.nonReadMessage.isFetching = false;
      state.nonReadMessage.error = true;
    },
  },
});

export const {
  getHistoryMessageStart,
  getHistoryMessageSuccess,
  getHistoryMessageFailed,
  getAllNonReadUserMessagesFailed,
  getAllNonReadUserMessagesSuccess,
  getAllNonReadUserMessagesStart,
  markReadMessagesStart,
  markReadMessageSuccess,
  markReadMessageFailed,
  getNonReadStart,
  getNonReadSuccess,
  getNonReadFailed,
} = messageSlide.actions;
export default messageSlide.reducer;
