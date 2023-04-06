import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: null
}

export const getAllProducts = createAsyncThunk('product/products', async () => {
  const res = await fetch(`http://localhost:3000/api/v1/products`)
  const data = await res.json()
  return data
})

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(reducer) {
    reducer
      .addCase(getAllProducts.fulfilled, (state, action) => {
        const isFulfilled = state;
        isFulfilled.status = 'Fulfilled';
        const dataJson = action.payload.data
        const toJSON = JSON.parse(dataJson)
        isFulfilled.products = toJSON
      })
  }
})

export default productSlice.reducer;