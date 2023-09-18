import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';

export const setMenuDetail = createAsyncThunk("menuDetail/setMenuDetail", async(index) =>{
    return index;
})
export const getSingleMenu = createAsyncThunk("menuDetail/getSingleMenu", async(itemID,{getState}) =>{
    const {displayMenu} = getState().menu;
    const selectedMenuDetail = displayMenu.filter(el=>el.ITEM_ID == itemID);
    return selectedMenuDetail[0];
});
export const setMenuDetailInit = createAsyncThunk("menuDetail/setMenuDetailInit", async() =>{
    return {menuDetailIndex: null,menuDetail:{}};
});

// Slice
export const menuDetailSlice = createSlice({
    name: 'menuDetail',
    initialState: {
        menuDetailID: null,
        menuDetail:{},
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(setMenuDetail.fulfilled,(state, action)=>{
            state.menuDetailID = action.payload;
        })
        // 메뉴 상세 받기
        builder.addCase(getSingleMenu.fulfilled,(state, action)=>{
            state.menuDetail = action.payload;
        })
        // 메뉴 상세 초기화
        builder.addCase(setMenuDetailInit.fulfilled,(state, action)=>{
            state.menuDetailID = null;
            state.menuDetail = {};
        })
    }
});

