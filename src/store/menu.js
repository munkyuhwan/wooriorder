import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';
import { MENU_DATA } from '../resources/menuData';
export const initMenu = createAsyncThunk("menu/initMenu", async(category) =>{
    return [];
})

export const getMenu = createAsyncThunk("menu/getMenu", async(category) =>{
    //console.log("category: ",category);
    //console.log("menu",category,": ",MENU_DATA.menus );
    return [];
    //MENU_DATA
    //return categoryMenu;
})

// Slice
export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menu: [],
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(getMenu.fulfilled,(state, action)=>{
            state.menu = action.payload;
        })
        builder.addCase(initMenu.fulfilled,(state, action)=>{
            state.menu = action.payload;
        })
    }
});

