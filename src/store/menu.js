import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';
import { MENU_DATA } from '../resources/menuData';
import axios from 'axios';
import { posMenuEdit, posMenuState, posOrderNew } from '../utils/apis';
import { setMainCategories } from './categories';
import { EventRegister } from 'react-native-event-listeners';

export const initMenu = createAsyncThunk("menu/initMenu", async(category) =>{
    return [];
})

export const getDisplayMenu = createAsyncThunk("menu/getDisplayMenu", async(_, {getState}) =>{
    const {selectedMainCategory} = getState().categories
    const {menu} = getState().menu;
    const displayMenu = menu.filter(item => item.ITEM_GROUP_CODE == selectedMainCategory);
    const itemList = displayMenu[0].ITEM_LIST;
    const finalItemList = itemList.filter(item => item.ITEM_USE_FLAG == "N");
    return finalItemList;
})

export const updateMenu = createAsyncThunk("menu/updateMenu", async(_,{rejectWithValue}) =>{
    return await posOrderNew();
})

export const getMenuState = createAsyncThunk("menu/menuState", async(_,{dispatch}) =>{
    const resultData = await posMenuState(dispatch);
    if(!resultData) {
        return
    }else {
        const isUpdated = resultData?.OBJ.UPDATE_YN;
        if(isUpdated=="Y") {
            // 날짜 기준 메뉴 업트가 있으면 새로 받아 온다.
            dispatch(getMenuEdit());
        }
    }
})

export const getMenuEdit = createAsyncThunk("menu/menuEdit", async(_,{dispatch, rejectWithValue}) =>{
    EventRegister.emit("showSpinner",{isSpinnerShow:true, msg:"메뉴를 갱신 중입니다."})
    const resultData = await posMenuEdit(dispatch);
    
    let categories = [];
    resultData.map((el)=>{
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
    EventRegister.emit("showSpinner",{isSpinnerShow:false, msg:""})
    return resultData;
})

// Slice
export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menu: [],
        displayMenu:[],
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(getDisplayMenu.fulfilled,(state, action)=>{
            state.displayMenu = action.payload;
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

