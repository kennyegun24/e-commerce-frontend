import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const completeOrder = async ({ TOKEN, order }) => {
    const BASE_URL = 'http://localhost:4000/api/v1'
    const userRequest = axios.create({
        baseURL: BASE_URL,
        headers: { 'Authorization': `Bearer ${TOKEN}` }
    })
    await userRequest.post('orders', { order })
}

const orderSlice = createSlice({
    name: 'user',
    initialState: {
        cardDetails: null,
        addressDetails: null
    },
    reducers: {
        detailsAdded: (state, action) => {
            state.cardDetails = (action.payload)
        },
        addressAdded: (state, action) => {
            state.addressDetails = action.payload
            console.log(action.payload)
        }
    },
},)

export const { detailsAdded, addressAdded } = orderSlice.actions;
export default orderSlice.reducer;