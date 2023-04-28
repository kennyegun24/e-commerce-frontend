import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCategories = createAsyncThunk('category/category', async () => {
  const res = await fetch('http://localhost:4000/api/v1/categories/all')
  const data = await res.json()
  return data
})

export const getCategory = createAsyncThunk('category/category/1', async () => {
  const res = await fetch('http://localhost:4000/api/v1/categories')
  const data = await res.json()
  return data
})

export const getOneCategory = createAsyncThunk('category/category/1/prod', async (id) => {
  const res = await fetch(`http://localhost:4000/api/v1/categories/${id}/products`)
  const data = await res.json()
  return data
})

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    category: [],
    oneCategory: [],
    status: false
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
        // const toJSON = JSON.parse(dataJson)
        isFulfilled.category = dataJson
      })
      .addCase(getOneCategory.pending, (state, action) => {
        const isFulfilled = state;
        isFulfilled.status = true
      })
      .addCase(getOneCategory.fulfilled, (state, action) => {
        const isFulfilled = state;
        isFulfilled.status = false
        // isFulfilled.status = 'Fulfilled'
        const dataJson = action.payload.data
        isFulfilled.oneCategory = dataJson
      })
  },
})

export default categorySlice.reducer