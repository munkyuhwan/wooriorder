import { createSlice } from '@reduxjs/toolkit'

// Slice
const slice = createSlice({
    name: 'onClick',
    initialState: {
        item: "",
    },
    reducers: {
        onClick: (state, action) => {
            state.item = action.payload;
        }
    },
});
export default slice.reducer

// Action
const { onClick } = slice.actions
export const clickItem = (item) => async dispatch => {
    try {
        dispatch(onClick(item));
    } catch (e) {
        return console.error(e.message);
    }
}