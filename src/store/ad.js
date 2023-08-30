import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getAD = createAsyncThunk("ad/getAD", async() =>{
    const adList = [
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
    return adList;
})
// Slice
export const adSlice = createSlice({
    name: 'ad',
    initialState: {
        adList:[
            {index:0, uri:"https://luehangs.site/pic-chat-app-images/pexels-photo-853168.jpeg"},
            {index:1, uri:"https://wooriorder.co.kr/order1/upload_file/banner/1690442249-iqthj.mp4"},
            {index:2, uri:"https://wooriorder.co.kr/order1/upload_file/banner/1690442221-fnjjn.mp4"},
            {index:3, uri:"https://wooriorder.co.kr/order1/upload_file/banner/1690442236-ehwgi.mp4"},
            {index:4, uri:"https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg"},
            {index:5, uri:"https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg"},
            {index:6, uri:"https://luehangs.site/pic-chat-app-images/photo-755745.jpeg"},
        ],
    },
    extraReducers:(builder)=>{
        // 고ㅏㅇ고  받기
        builder.addCase(getAD.fulfilled,(state, action)=>{
            state.callServerItems = action.payload;
        })
    }
});

