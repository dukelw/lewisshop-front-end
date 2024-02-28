import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    checkout: {
      checkoutResult: null,
      isFetching: false,
      error: false,
    },
    orders: {
      allOrder: null,
      isFetching: false,
      error: false,
    },
    createOrder: {
      newOrder: null,
      isFetching: false,
      error: false,
    },
    cancelOrder: {
      isFetching: false,
      error: false,
    },
    findOrder: {
      foundOrder: null,
      isFetching: false,
      error: false,
    },
    updateOrderStatus: {
      updatedStatus: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    checkoutStart: (state) => {
      state.checkout.isFetching = true;
    },
    checkoutSuccess: (state, action) => {
      state.checkout.isFetching = false;
      state.checkout.checkoutResult = action.payload;
    },
    checkoutFailed: (state) => {
      state.checkout.isFetching = false;
      state.checkout.checkoutResult = null;
      state.checkout.error = true;
    },
    findOrdersStart: (state) => {
      state.orders.isFetching = true;
    },
    findOrdersSuccess: (state, action) => {
      state.orders.isFetching = false;
      state.orders.allOrder = action.payload;
    },
    findOrdersFailed: (state) => {
      state.orders.isFetching = false;
      state.orders.allOrder = null;
      state.orders.error = true;
    },
    createOrderStart: (state) => {
      state.createOrder.isFetching = true;
    },
    createOrderSuccess: (state, action) => {
      state.createOrder.isFetching = false;
      state.createOrder.newOrder = action.payload;
    },
    createOrderFailed: (state) => {
      state.createOrder.isFetching = false;
      state.createOrder.newOrder = null;
      state.createOrder.error = true;
    },
    cancelOrderStart: (state) => {
      state.cancelOrder.isFetching = true;
    },
    cancelOrderSuccess: (state) => {
      state.cancelOrder.isFetching = false;
    },
    cancelOrderFailed: (state) => {
      state.cancelOrder.isFetching = false;
      state.cancelOrder.error = true;
    },
    findOrdersByShopStart: (state) => {
      state.findOrder.isFetching = true;
    },
    findOrdersByShopSuccess: (state, action) => {
      state.findOrder.isFetching = false;
      state.findOrder.foundOrder = action.payload;
    },
    findOrdersByShopFailed: (state) => {
      state.findOrder.isFetching = false;
      state.findOrder.foundOrder = null;
      state.findOrder.error = true;
    },
    updateOrderStatusStart: (state) => {
      state.updateOrderStatus.isFetching = true;
    },
    updateOrderStatusSuccess: (state, action) => {
      state.updateOrderStatus.isFetching = false;
      state.updateOrderStatus.updatedStatus = action.payload;
    },
    updateOrderStatusFailed: (state) => {
      state.updateOrderStatus.isFetching = false;
      state.updateOrderStatus.updatedStatus = null;
      state.updateOrderStatus.error = true;
    },
  },
});

export const {
  checkoutStart,
  checkoutSuccess,
  checkoutFailed,
  findOrdersStart,
  findOrdersSuccess,
  findOrdersFailed,
  createOrderStart,
  createOrderSuccess,
  createOrderFailed,
  cancelOrderStart,
  cancelOrderSuccess,
  cancelOrderFailed,
  findOrdersByShopStart,
  findOrdersByShopSuccess,
  findOrdersByShopFailed,
  updateOrderStatusStart,
  updateOrderStatusFailed,
  updateOrderStatusSuccess,
} = orderSlice.actions;

export default orderSlice.reducer;
