import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';
import { MENU_DATA } from '../resources/menuData';
import axios from 'axios';


export const updateMenu = createAsyncThunk("menu/updateMenu", async(_,{rejectWithValue}) =>{
    return await axios.post(
        "https://tordif.smilebiz.co.kr/partner/v1/menu/edit",
        {"STORE_ID":"3100396007"},
        {Accept: 'application/json','Content-Type': 'application/json'},
    )
    .then((response => response.data))
    .catch(error=>rejectWithValue(error.response.data));
})

export const initMenu = createAsyncThunk("menu/initMenu", async(category) =>{
    return [];
})

export const getMenu = createAsyncThunk("menu/getMenu", async(_, {getState}) =>{
    const {selectedMainCategory,selectedSubCategory} = getState().categories
    const menuData = MENU_DATA?.menus[selectedMainCategory]?.items[selectedSubCategory]
    return menuData||[];
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
            console.log("update fulfilled: ",action.payload);
            const payload = action.payload;
            console.log("state: ",state);
            if(payload.ERRCODE != "") {
                state.menu = action.payload;
            }else {
                state.errorCode = action.payload.ERRORCODE
                state.errorCode = action.payload.MSG
            }
        })
        builder.addCase(updateMenu.pending,(state, action)=>{
            state.error = action.payload;
        })
        builder.addCase(updateMenu.rejected,(state, { payload }) => {
            state.error = payload;
        })
    }
});

