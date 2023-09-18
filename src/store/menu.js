import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';
import { MENU_DATA } from '../resources/menuData';
import axios from 'axios';
import { posMenuEdit, posMenuState, posOrderNew } from '../utils/apis';
import { setMainCategories } from './categories';

export const initMenu = createAsyncThunk("menu/initMenu", async(category) =>{
    return [];
})

export const getMenu = createAsyncThunk("menu/getMenu", async(_, {getState}) =>{
    const {selectedMainCategory,selectedSubCategory} = getState().categories
    const menuData = MENU_DATA?.menus[selectedMainCategory]?.items[selectedSubCategory]
    return menuData||[];
})

export const updateMenu = createAsyncThunk("menu/updateMenu", async(_,{rejectWithValue}) =>{
    return await posOrderNew();
})

export const getMenuState = createAsyncThunk("menu/menuState", async(_,{rejectWithValue}) =>{
    return await posMenuState();
})

export const getMenuEdit = createAsyncThunk("menu/menuEdit", async(_,{dispatch, rejectWithValue}) =>{
    const resultData = await posMenuEdit(dispatch);
    
    let categories = [];
    resultData.map((el)=>{
        //console.log("el: ",el);
        if(el.ITEM_GROUP_USE_FLAG == "N") {
            const categoryData = {
                ITEM_GROUP_CNT:el.ITEM_GROUP_CNT,
                ITEM_GROUP_CODE:el.ITEM_GROUP_CODE,
                ITEM_GROUP_NAME:el.ITEM_GROUP_NAME,
                ITEM_GROUP_USE_FLAG:el.ITEM_GROUP_USE_FLAG,
            };
            categories.push(categoryData)
        }
    });
    dispatch(setMainCategories(categories));
    return await resultData();
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

        builder.addCase(updateMenu.fulfilled,(state, action)=>{
            //console.log("update fulfilled: ",action.payload);
            //const payload = action.payload;
            //console.log("data: ",payload.data) 
            //console.log("status: ",payload.status)
            //console.log("state: ",state);
            /* if(payload.ERRCODE != "") { 
                state.menu = action.payload;
            }else {
                state.errorCode = action.payload.ERRORCODE
                state.errorCode = action.payload.MSG
            } */
        })
        builder.addCase(getMenuState.fulfilled,(state, action)=>{
        })
        builder.addCase(getMenuEdit.fulfilled,(state, action)=>{
            state.menu = action.payload;
        })

    }
});

