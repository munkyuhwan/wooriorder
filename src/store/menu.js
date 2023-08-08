import { createSlice } from '@reduxjs/toolkit'

// Slice
const slice = createSlice({
    name: 'menu',
    initialState: {
        menu: [],
    },
    reducers: {
        addMenuSuccess: (state, action) => {
            state.menu = action.payload;
        }
    },
});
export default slice.reducer

// Action
const { addMenuSuccess } = slice.actions
export const addMenu = (menu) => async dispatch => {
    try {
        dispatch(addMenuSuccess(menu));
    } catch (e) {
        return console.error(e.message);
    }
}