import { createSlice } from '@reduxjs/toolkit'

// Slice
const slice = createSlice({
    name: 'languageSelect',
    initialState: {
        language: "korean",
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
    },
});
export default slice.reducer

// Action
const { setLanguage } = slice.actions
export const changeLanguage = (lan) => async dispatch => {
    try {
        dispatch(setLanguage(lan));
    } catch (e) {
        return console.error(e.message);
    }
}