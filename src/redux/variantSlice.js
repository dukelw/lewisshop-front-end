import { createSlice } from '@reduxjs/toolkit';

const variantSlice = createSlice({
  name: 'variant',
  initialState: {
    get: {
      allVariants: null,
      isFetching: false,
      error: false,
    },
    find: {
      variant: null,
      isFetching: false,
      error: false,
    },
    create: {
      isFetching: true,
      error: false,
    },
    update: {
      updatedVariants: null,
      isFetching: false,
      error: false,
    },
    delete: {
      isFetching: true,
      error: false,
    },
    deleteAll: {
      isFetching: true,
      error: false,
    },
  },
  reducers: {
    getVariantsStart: (state) => {
      state.get.isFetching = true;
    },
    getVariantsSuccess: (state, action) => {
      state.get.isFetching = false;
      state.get.allVariants = action.payload;
    },
    getVariantsFailed: (state) => {
      state.get.isFetching = false;
      state.get.allVariants = null;
      state.get.error = true;
    },
    findVariantsStart: (state) => {
      state.find.isFetching = true;
    },
    findVariantsSuccess: (state, action) => {
      state.find.isFetching = false;
      state.find.variant = action.payload;
    },
    findVariantsFailed: (state) => {
      state.find.isFetching = false;
      state.find.variant = null;
      state.find.error = true;
    },
    updateVariantStart: (state) => {
      state.update.isFetching = true;
    },
    updateVariantSuccess: (state, action) => {
      state.update.isFetching = false;
      state.update.updatedVariants = action.payload;
    },
    updateVariantFailed: (state) => {
      state.update.isFetching = false;
      state.update.updatedVariants = null;
      state.update.error = true;
    },
    createVariantStart: (state) => {
      state.create.isFetching = true;
    },
    createVariantSuccess: (state) => {
      state.create.isFetching = false;
    },
    createVariantFailed: (state) => {
      state.create.isFetching = false;
      state.create.error = true;
    },
    deleteVariantStart: (state) => {
      state.delete.isFetching = true;
    },
    deleteVariantSuccess: (state) => {
      state.delete.isFetching = false;
    },
    deleteVariantFailed: (state) => {
      state.delete.isFetching = false;
      state.delete.error = true;
    },
    deleteVariantsStart: (state) => {
      state.deleteAll.isFetching = true;
    },
    deleteVariantsSuccess: (state) => {
      state.deleteAll.isFetching = false;
    },
    deleteVariantsFailed: (state) => {
      state.deleteAll.isFetching = false;
      state.deleteAll.error = true;
    },
  },
});

export const {
  getVariantsStart,
  getVariantsSuccess,
  getVariantsFailed,
  findVariantsStart,
  findVariantsFailed,
  findVariantsSuccess,
  updateVariantStart,
  updateVariantSuccess,
  updateVariantFailed,
  createVariantStart,
  createVariantSuccess,
  createVariantFailed,
  deleteVariantsFailed,
  deleteVariantsSuccess,
  deleteVariantsStart,
  deleteVariantStart,
  deleteVariantSuccess,
  deleteVariantFailed,
} = variantSlice.actions;

export default variantSlice.reducer;
