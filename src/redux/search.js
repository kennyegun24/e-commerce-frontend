import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        search: '',
    },
    reducers: {
        searchInp: (state, action) => {
            state.search = action.payload
            // console.log(action.payload)
        }
    }
})

export const { searchInp } = searchSlice.actions;
export default searchSlice.reducer;