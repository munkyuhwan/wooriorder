import { createSlice } from '@reduxjs/toolkit'

// Slice
const slice = createSlice({
    name: 'onClick',
    initialState: {
        mainItem: "",
    },
    reducers: {
        onMainClick: (state, action) => {
            state.mainItem = action.payload;
        }
    },
});
export default slice.reducer

// Action
const { onMainClick } = slice.actions
export const clickMainItem = (item) => async dispatch => {
    try {
        dispatch(onMainClick(item));
    } catch (e) {
        return console.error(e.message);
    }
}