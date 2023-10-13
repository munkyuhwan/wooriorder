import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { posTableList } from '../utils/apis';

export const setTableInfo = createAsyncThunk("tableInfo/setTableInfo", async(data) =>{
    return data;
})
export const getTableList = createAsyncThunk("tableInfo/getTableList", async(data,{dispatch}) =>{
    return await posTableList(dispatch)
})

// Slice
export const tableInfoSlice = createSlice({
    name: 'tableInfo',
    initialState: {
        tableInfo:{"FLR_CODE": "0001", "FLR_NAME": "001", "TBL_CODE": "0029", "TBL_NAME": "27"},
        tableList:[],
        tableCode:"0001",
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(setTableInfo.fulfilled,(state, action)=>{
            state.tableInfo = action.payload;
        })
        builder.addCase(getTableList.fulfilled,(state, action)=>{
            state.tableList = action.payload;
        })
        
    }
});

