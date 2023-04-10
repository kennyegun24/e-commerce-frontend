import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'user',
  initialState: {
    products: [],
    total: null,
  },
  reducers: {
    itemAdded: (state, action) => {
      state.products.push(action.payload)
      state.total += action.payload.price
    },
    deleteCart: (state, action) => {
      const productId = action.payload.id
      const updatedProducts = state.products.filter(product => product.id !== productId)
      state.products = updatedProducts
      state.total -= action.payload.price
    }
  },
},)

export const { itemAdded, loadCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;