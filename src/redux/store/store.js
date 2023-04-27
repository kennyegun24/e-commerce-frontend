import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  stores: [],
  allStores: [],
  oneStore: []
}
export const getStores = createAsyncThunk('store/store', async () => {
  const res = await fetch('http://localhost:3000/api/v1/stores')
  const data = await res.json()
  return data
})

export const getAllStores = createAsyncThunk('store/allStore', async () => {
  const res = await fetch('http://localhost:3000/api/v1/stores/all')
  const data = await res.json()
  return data
})

export const getOneStore = createAsyncThunk('store/Store/:id', async (id) => {
  const res = await fetch(`http://localhost:3000/api/v1/stores/${id}/products`)
  const data = await res.json()
  console.log(data)
  return data
})

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {},
  extraReducers(reduce) {
    reduce
      .addCase(getStores.fulfilled, (state, action) => {
        const isFulfilled = state;
        isFulfilled.status = 'Fulfilled'
        isFulfilled.stores = action.payload.data
      })
      .addCase(getAllStores.fulfilled, (state, action) => {
        const isFulfilled = state;
        isFulfilled.status = 'Fulfilled';
        // const dataJson = action.payload.data
        // const toJSON = JSON.parse(dataJson)
        isFulfilled.allStores = action.payload.data
      })
      .addCase(getOneStore.pending, (state) => {
        const isFulfilled = state;
        isFulfilled.status = true;
        // const dataJson = action.payload.data
        // const toJSON = JSON.parse(dataJson)
        // isFulfilled.oneStore = action.payload.data
      })
      .addCase(getOneStore.fulfilled, (state, action) => {
        const isFulfilled = state;
        isFulfilled.status = false;
        // const dataJson = action.payload.data
        // const toJSON = JSON.parse(dataJson)
        isFulfilled.oneStore = action.payload.data
      })
  }
})

export default storeSlice.reducer;