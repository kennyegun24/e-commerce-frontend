import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: [],
  status: false
}

export const getAllProducts = createAsyncThunk('product/products', async () => {
  const res = await fetch(`http://localhost:4000/api/v1/products`)
  const data = await res.json()
  return data
})

export const getOneProduct = createAsyncThunk('product/product/id', async (id) => {
  const res = await fetch(`http://localhost:4000/api/v1/products/${id}`)
  const data = await res.json()
  console.log(data)
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

      .addCase(getOneProduct.pending, (state) => {
        const isFulfilled = state;
        isFulfilled.status = true;
      })

      .addCase(getOneProduct.fulfilled, (state, action) => {
        const isFulfilled = state;
        isFulfilled.status = false;
        isFulfilled.product = action.payload.data
      })
  }
})

export default productSlice.reducer;