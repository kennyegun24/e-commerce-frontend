import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './user/user';
import productSlice from './product/product';
import cartSlice from './cart/cart';
import storeSlice from './store/store';
import categorySlice from './category/category';
import orderSlice from './order/order';
import searchSlice from './search';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, userSlice)
const persistedCartReducer = persistReducer(persistConfig, cartSlice)

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    cart: persistedCartReducer,
    product: productSlice,
    store: storeSlice,
    category: categorySlice,
    search: searchSlice,
    orders: orderSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)
