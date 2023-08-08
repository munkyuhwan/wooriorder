import { createSlice } from '@reduxjs/toolkit'

// Slice
const slice = createSlice({
    name: 'onClick',
    initialState: {
        mainItem: "",
        topItem:"",
    },
    reducers: {
        onMainClick: (state, action) => {
            state.mainItem = action.payload;
        },
        onTopClick:  (state, action) => {
            state.topItem = action.payload;
        },
    },
});
export default slice.reducer

// Action
const { onMainClick, onTopClick } = slice.actions
export const clickMainItem = (item) => async dispatch => {
    try {
        dispatch(onMainClick(item));
    } catch (e) {
        return console.error(e.message);
    }
}
export const clickTopItem = (item) => async dispatch => {
    try {
        dispatch(onTopClick(item));
    } catch (e) {
        return console.error(e.message);
    }
}