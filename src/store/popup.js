import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const setPopupVisibility = createAsyncThunk("popup/setPopupVisibility", async(popup) =>{
    return popup;
})
export const setPopupContent = createAsyncThunk("popup/setPopupContent", async(popup) =>{
    return popup;
})
export const setTransPopupVisibility = createAsyncThunk("popup/setTransPopupVisibility", async(popup) =>{
    return popup;
})
// Slice
export const popupsSlice = createSlice({
    name: 'popup',
    initialState: {
        isPopupVisible:false,
        isTransPopupVisible:false,
        innerView:""
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(setPopupVisibility.fulfilled,(state, action)=>{
            state.isPopupVisible = action.payload.isPopupVisible;
        })
        builder.addCase(setPopupContent.fulfilled,(state, action)=>{
            state.innerView = action.payload.innerView;
        })
        builder.addCase(setTransPopupVisibility.fulfilled,(state, action)=>{
            console.log("setTransPopupVisibility!!!! ",action.payload.isPopupVisible);
            state.isTransPopupVisible = action.payload.isPopupVisible;
        })
    }
});

