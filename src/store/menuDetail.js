import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const setMenuDetail = createAsyncThunk("menuDetail/setMenuDetail", async(index) =>{
    return index;
})

// Slice
export const menuDetailSlice = createSlice({
    name: 'menuDetail',
    initialState: {
        menuDetailIndex: null,
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(setMenuDetail.fulfilled,(state, action)=>{
            state.menuDetailIndex = action.payload;
        })
    }
});

