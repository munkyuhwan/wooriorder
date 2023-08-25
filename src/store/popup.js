import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const setPopupVisibility = createAsyncThunk("popup/setPopupVisibility", async(popup) =>{
    return popup;
})
export const setPopupContent = createAsyncThunk("popup/setPopupContent", async(popup) =>{
    return popup;
})
// Slice
export const popupsSlice = createSlice({
    name: 'popup',
    initialState: {
        isPopupVisible:false,
        innerView:""
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(setPopupVisibility.fulfilled,(state, action)=>{
            console.log("action.payload: ",action.payload.innerView)
            state.isPopupVisible = action.payload.isPopupVisible;
        })
        builder.addCase(setPopupContent.fulfilled,(state, action)=>{
            console.log("action.payload: ",action.payload.innerView)
            state.innerView = action.payload.innerView;
        })
    }
});

