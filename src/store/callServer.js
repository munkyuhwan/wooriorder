import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getCallServerItems = createAsyncThunk("callServer/getCallServerItems", async() =>{
    const getCallServerItem = [
        {index:0, name:"벌레가 나왔어요."},
        {index:1, name:"음식이 잘못 나왔어요."},
        {index:2, name:"음식이 안나와요."},
        {index:3, name:"그릇이 부족해요."},
        {index:4, name:"음식이 너무너무 맛이가 없으무니다."},
        {index:5, name:"여기좀 와주세요."},
        {index:6, name:"물좀 주세요."},
        {index:7, name:"컵좀 주세요."},
        {index:8, name:"요청사항 1"},
        {index:9, name:"요청사항 2"},
        {index:10, name:"요청사항 3"},
        {index:11, name:"요청사항 4"},]
    return getCallServerItem;
})
export const setCallServerItem = createAsyncThunk("callServer/setCallServerItem", async(index) =>{
    return index;
})
// Slice
export const callServerSlice = createSlice({
    name: 'callServer',
    initialState: {
        callServerItems:[],
        selectedItem:0,
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(getCallServerItems.fulfilled,(state, action)=>{
            state.callServerItems = action.payload;
        })
        // 메인 카테고리 선택
        builder.addCase(setCallServerItem.fulfilled,(state, action)=>{
            state.selectedItem = action.payload;
        })
    }
});

