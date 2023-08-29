import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const setOrderList = createAsyncThunk("order/setOrderList", async(index) =>{
    return index;
})
// Slice
export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        grandTotal:500000,
        orderList:[
            {index:1, name:"떡뽁이", ea:1, price:4000, imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295671-exdfr.jpg"},
            {index:2, name:"김밥", ea:2, price:4400, imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295671-exdfr.jpg"},
            {index:3, name:"순대", ea:1, price:5000, imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295671-exdfr.jpg"},
            {index:4, name:"까르본라", ea:3, price:5500, imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295671-exdfr.jpg"},
            {index:5, name:"카리나", ea:5, price:8000, imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295671-exdfr.jpg"},
            {index:6, name:"이리떼", ea:1, price:11000, imgUrl:"https://wooriorder.co.kr/order1/upload_file/goods/1689295671-exdfr.jpg"},
        ],
    },
    extraReducers:(builder)=>{
        // 주문 셋
        builder.addCase(setOrderList.fulfilled,(state, action)=>{
            state.callServerItems = action.payload;
        })
    }
});
