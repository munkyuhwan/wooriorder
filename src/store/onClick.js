import { createSlice } from '@reduxjs/toolkit'

// Slice
const slice = createSlice({
    name: 'onClick',
    initialState: {
        mainItemIndex: 0,
        topItemIndex:0,
    },
    reducers: {
        onMainClick: (state, action) => {
            state.mainItemIndex = action.payload;
        },
        onTopClick:  (state, action) => {
            state.topItemIndex = action.payload;
        },
    },
});
export default slice.reducer

// Action
const { onMainClick, onTopClick } = slice.actions
export const clickMainItem = (index) => async dispatch => {
    try {
        dispatch(onMainClick(index));
        dispatch(onTopClick(0));

    } catch (e) {
        return console.error(e.message);
    }
}
export const clickTopItem = (index) => async dispatch => {
    try {
        console.log("click top item: ",index)
        dispatch(onTopClick(index));
    } catch (e) {
        return console.error(e.message);
    }
}