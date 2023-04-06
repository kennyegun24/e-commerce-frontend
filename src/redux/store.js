import { configureStore } from '@reduxjs/toolkit'
// import userSlice from '../user/user'
import userSlice from './user/user'
import productSlice from './product/product'
import cartSlice from './cart/cart'
import storeSlice from './store/store'
import categorySlice from './category/category'
export const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    cart: cartSlice,
    store: storeSlice,
    category: categorySlice
  }
})
