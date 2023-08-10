import { createSlice } from '@reduxjs/toolkit'

// Slice
const slice = createSlice({
    name: 'onClick',
    initialState: {
        mainItemIndex: 0,
        mainSelectedItemIndex:0,
        topItemIndex:0,
        topSelectedItemIndex:0,
        isIconOn:false,
    },
    reducers: {
        onMainClick: (state, action) => {
            state.mainItemIndex = action.payload;
        },
        onTopClick:  (state, action) => {
            state.topItemIndex = action.payload;
        },
        onIconClick: (state, action) =>{
            state.isIconOn = action.payload;
        }
    },
});
export default slice.reducer

// Action
const { onMainClick, onTopClick, onIconClick } = slice.actions
export const clickMainItem = (index) => async dispatch => {
    try {
        dispatch(onMainClick(index));
        //dispatch(onTopClick(0));

    } catch (e) {
        return console.error(e.message);
    }
}
export const clickTopItem = (index) => async dispatch => {
    try {
        dispatch(onTopClick(index));
    } catch (e) {
        return console.error(e.message);
    }
}
export const clickIcon = (onOff) =>async dispatch=>{
    try {
        dispatch(onIconClick(onOff));
    } catch (e) {
        return console.error(e.message);
    }
}