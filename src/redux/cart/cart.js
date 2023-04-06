import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'user',
  initialState: {
    products: [],
    total: null,
  },
  reducers: {
    itemAdded: (state, action) => {
      // const { currentUser } = action.payload
      // state.isFetching = false
      // const setStore = JSON.parse(localStorage.getItem(`setKennyStoreItemsInStorage${currentUser}`)) || []
      // setStore.push(action.payload)
      // localStorage.setItem(`setKennyStoreItemsInStorage${currentUser}`, JSON.stringify(setStore))
      // const getStore = JSON.parse(localStorage.getItem(`setKennyStoreItemsInStorage${currentUser}`))
      // const getPrice = getStore.map(map => map.price != null ? map.price : 0);
      // const sum = getPrice.reduce((total, number) => total + number);
      // state.products = getStore
      // state.total = sum
      state.products.push(action.payload)
      state.total += action.payload.price
    },
    deleteCart: (state, action) => {
      const productId = action.payload.id
      const updatedProducts = state.products.filter(product => product.id !== productId)
      state.products = updatedProducts
      state.total -= action.payload.price
    }
    // loadCart: (state, action) => {
    // const { currentUser } = action.payload
    // const getStore = JSON.parse(
    //   localStorage.getItem(`setKennyStoreItemsInStorage${currentUser}`)
    // );
    // if (getStore) {
    //   const getPrice = getStore.map((map) => (map.price != null ? map.price : 0));
    //   const sum = getPrice.length > 0 && getPrice.reduce((total, number) => total + number);
    //   state.products = getStore;
    //   state.total = sum;
    //   state.isFetching = false;
    // }
    // }
  },
},)

export const { itemAdded, loadCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;