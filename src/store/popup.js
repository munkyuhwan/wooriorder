import { createSlice } from '@reduxjs/toolkit'

// Slice
const slice = createSlice({
    name: 'popup',
    initialState: {
        isPopupVisible: false,
    },
    reducers: {
        setPopupVisible: (state, action) => {
            state.isPopupVisible = action.payload;
        },
    },
});
export default slice.reducer

// Action
const { setPopupVisible } = slice.actions
export const setPopupVisibility = (isPopupVisible) => async dispatch => {
    try {
        dispatch(setPopupVisible(isPopupVisible));
    } catch (e) {
        return console.error(e.message);
    }
}