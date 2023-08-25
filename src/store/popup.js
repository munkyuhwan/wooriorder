import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const setPopupVisibility = createAsyncThunk("popup/setPopupVisibility", async(popup) =>{
    console.log("popupType: ",popup)
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
            console.log("action.payload: ",action.payload.popupType)
            state.isPopupVisible = action.payload.isPopupVisible;
            state.innerView = action.payload.innerView;
        })
    }
});

