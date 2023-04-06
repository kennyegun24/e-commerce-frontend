import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCategories = createAsyncThunk('category/category', async () => {
  const res = await fetch('http://localhost:3000/api/v1/categories/all')
  const data = await res.json()
  return data
})

export const getCategory = createAsyncThunk('category/category/1', async () => {
  const res = await fetch('http://localhost:3000/api/v1/categories')
  const data = await res.json()
  return data
})

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    category: [],
    status: null
  },
  reducers: {},
  extraReducers: (reduce) => {
    reduce
      .addCase(getAllCategories.fulfilled, (state, action) => {
        const isFulfilled = state;
        isFulfilled.status = 'Fulfilled';
        const dataJson = action.payload.data
        const toJSON = JSON.parse(dataJson)
        isFulfilled.categories = toJSON
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        const isFulfilled = state;
        isFulfilled.status = 'Fulfilled'
        const dataJson = action.payload.data
        const toJSON = JSON.parse(dataJson)
        isFulfilled.category = toJSON
      })
  },
})

export default categorySlice.reducer