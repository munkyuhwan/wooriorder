import { createSlice } from '@reduxjs/toolkit'

// Slice
const slice = createSlice({
    name: 'order',
    initialState: {
        test: "",
    },
    reducers: {
        onTest: (state, action) => {
            state.test = action.payload;
        },
    },
});
export default slice.reducer
const { onTest } = slice.actions
export const onTestStr = (str) => async dispatch => {
    console.log('str: ',str)
    try {
        dispatch(onTest(str));

    } catch (e) {
        return console.error(e.message);
    }
}