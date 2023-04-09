import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        search: '',
        minVal: 0,
        maxVal: 0,
    },
    reducers: {
        searchInp: (state, action) => {
            state.search = action.payload
        },
        getMinVal: (state, action) => {
            state.minVal = action.payload
        },
        getMaxVal: (state, action) => {
            state.maxVal = action.payload
        }
    }
})

export const { searchInp, getMinVal, getMaxVal } = searchSlice.actions;
export default searchSlice.reducer;