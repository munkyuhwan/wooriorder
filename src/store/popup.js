import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const setPopupVisibility = createAsyncThunk("popup/setPopupVisibility", async(isOpen) =>{
    return isOpen;
})
// Slice
export const popupsSlice = createSlice({
    name: 'popup',
    initialState: {
        isPopupVisible:false,
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(setPopupVisibility.fulfilled,(state, action)=>{
            state.isPopupVisible = action.payload;
        })
    }
});

