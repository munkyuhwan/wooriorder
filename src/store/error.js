import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const initError = createAsyncThunk("error/initError", async(category) =>{
    return [];
})

// Slice
export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        msg: "",
        errorCode:"", 
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(initError.fulfilled,(state, action)=>{
            console.log("get error msg: ",state.msg);
            state.msg = action.payload;
        })
       
    }
});

