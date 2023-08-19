import { createSlice } from '@reduxjs/toolkit'

// Slice
const slice = createSlice({
    name: 'menuDetail',
    initialState: {
        menuDetailIndex:null,
        
    },
    reducers: {
        menuDetailIndexSelect:(state, action) => {
            state.menuDetailIndex = action.payload;
        }
    },
});
export default slice.reducer

// Action
const {  menuDetailIndexSelect } = slice.actions
export const onMenuDetailView = (index) => async dispatch =>{
    try {
        dispatch(menuDetailIndexSelect(index));
    } catch (e) {
        return console.error(e.message);
    }
}