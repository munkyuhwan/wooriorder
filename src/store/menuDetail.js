import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';

export const setMenuDetail = createAsyncThunk("menuDetail/setMenuDetail", async(index) =>{
    return index;
})
export const getSingleMenu = createAsyncThunk("menuDetail/getSingleMenu", async(index,{getState}) =>{
    const {menu} = getState().menu;
    return menu[index];
});
export const setMenuDetailInit = createAsyncThunk("menuDetail/setMenuDetailInit", async() =>{
    return {menuDetailIndex: null,menuDetail:{}};
});

// Slice
export const menuDetailSlice = createSlice({
    name: 'menuDetail',
    initialState: {
        menuDetailIndex: null,
        menuDetail:{},

    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(setMenuDetail.fulfilled,(state, action)=>{
            state.menuDetailIndex = action.payload;
        })
        // 메뉴 상세 받기
       builder.addCase(getSingleMenu.fulfilled,(state, action)=>{
           state.menuDetail = action.payload;
       })
       // 메뉴 상세 초기화
      builder.addCase(setMenuDetailInit.fulfilled,(state, action)=>{
          state.menuDetailIndex = null;
          state.menuDetail = {};

      })
    }
});

