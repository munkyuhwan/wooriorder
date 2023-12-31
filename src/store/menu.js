import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';
import { MENU_DATA } from '../resources/menuData';
import axios from 'axios';
import { adminMenuEdit, adminOptionEdit, getAdminCategories, posMenuEdit, posMenuState, posOrderNew } from '../utils/apis';
import { setMainCategories } from './categories';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setMenuCategories, setMenuExtra, setOptionExtra } from './menuExtra';
import { CALL_SERVICE_GROUP_CODE } from '../resources/apiResources';
import { setCallServerList } from './callServer';
import { DEFAULT_CATEGORY_ALL_CODE } from '../resources/defaults';
import { fileDownloader } from '../utils/common';
import { initImageStorage } from './imageStorage';

export const initMenu = createAsyncThunk("menu/initMenu", async(category) =>{
    return [];
})

export const getDisplayMenu = createAsyncThunk("menu/getDisplayMenu", async(_, {getState}) =>{
    const {selectedMainCategory,selectedSubCategory} = getState().categories
    const {menu, allItems} = getState().menu;
    const {menuExtra} = getState().menuExtra;

    if(selectedMainCategory == 0 && selectedSubCategory == 0) {
        return;
    }

    const cateCode = selectedSubCategory==DEFAULT_CATEGORY_ALL_CODE ? selectedMainCategory:selectedSubCategory;
  
    if(selectedSubCategory == DEFAULT_CATEGORY_ALL_CODE) {
        // 소분류 전체 일떄
        const displayMenu = menu.filter(item => item.ITEM_GROUP_CODE == selectedMainCategory);
        const itemList = displayMenu[0].ITEM_LIST;
        const finalItemList = itemList.filter(item => item.ITEM_USE_FLAG == "N");
        return [...finalItemList];

        //return finalItemList;
    }else {
        // 소분류 선택 되었을때
        const displayMenuExtra = menuExtra.filter(el => el.cate_code == cateCode);
        const displayMenu = [];
        if(displayMenuExtra.length>0) {
            displayMenuExtra.map(displayEl =>{
                const filteredMenu = allItems.filter(menuItem => menuItem.ITEM_ID == displayEl.pos_code);
                displayMenu.push(filteredMenu[0]);
            })
        }
        const finalItemList = displayMenu.filter(item => item.ITEM_USE_FLAG == "N");
        return finalItemList;
    
    }
   

    
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
        const updateDateTime = resultData?.OBJ.UPDATE_DTIME.slice(0,14);

        if(isUpdated=="Y") {
            // 날짜 기준 메뉴 업트가 있으면 새로 받아 온다.
            AsyncStorage.setItem("lastUpdate",updateDateTime);
            dispatch(getMenuEdit());
            dispatch(getDisplayMenu());
        }
    }
})

export const getMenuEdit = createAsyncThunk("menu/menuEdit", async(_,{dispatch, rejectWithValue}) =>{
    EventRegister.emit("showSpinner",{isSpinnerShow:true, msg:"메뉴를 갱신 중입니다."})
    // 1. 포스 메뉴 받기
    const resultData = await posMenuEdit(dispatch);
    let categories = [];
    //let callService = [];
    let allItems = [];
    resultData.map((el)=>{
        if(el.ITEM_GROUP_USE_FLAG == "N") {
            const categoryData = {
                ITEM_GROUP_CNT:el.ITEM_GROUP_CNT,
                ITEM_GROUP_CODE:el.ITEM_GROUP_CODE,
                ITEM_GROUP_NAME:el.ITEM_GROUP_NAME,
                ITEM_GROUP_USE_FLAG:el.ITEM_GROUP_USE_FLAG,
            };
            if(el.ITEM_GROUP_CODE != CALL_SERVICE_GROUP_CODE) {
                categories.push(categoryData)
                el.ITEM_LIST.map(itemList=>{
                    if(itemList.ITEM_USE_FLAG=="N") {
                        allItems.push(itemList);
                    }
                })
                //allItems.push(el.ITEM_LIST);
            }else {
                //callService = el;
            }
        }
    });
    // 직원호출 스테이트 없데이트
    //dispatch(setCallServerList(callService));
    

    // 2. 어드민 메뉴 데이터 받기
    const adminData = await adminMenuEdit(dispatch).catch(err=>console.log(err));
    let adminMenu = [];
    if(adminData) {
        adminMenu = adminData.order;
        await dispatch(initImageStorage());
        for(var i=0;i<adminMenu?.length;i++) {
            //console.log("admin menu: ", `${adminMenu[i].pos_code}`,`https:${adminMenu[i].gimg_chg}`);
            await fileDownloader(dispatch, `${adminMenu[i].pos_code}`,`https:${adminMenu[i].gimg_chg}`).catch("");
        }
        dispatch(setMenuExtra(adminMenu));
    }

    // 3. 어드민 옵션 데터 받기
    const adminOptionData = await adminOptionEdit(dispatch).catch(err=>console.log(err));
    let adminOption = [];
    if(adminOptionData.result) {
        adminOption = adminOptionData;
        dispatch(setOptionExtra(adminOption));
    }
    // 4. 어드민 카테고리 받기
    const getAdminCategoriesData = await getAdminCategories(dispatch).catch(err=>console.log(err));
    let adminCategories = [];
    let totalCategories = []
    if(getAdminCategoriesData.result) {
        adminCategories = getAdminCategoriesData?.goods_category;
        adminCategories = adminCategories?.filter(el=>(el.is_del=="N"&&el.is_use=="Y"));
        categories.map(catData => {
            const filteredCategory = adminCategories.filter(acEl => acEl.cate_code1 == catData.ITEM_GROUP_CODE);
            if(filteredCategory.length > 0) {
                totalCategories.push(filteredCategory[0]);
            }
        })
        dispatch(setMenuCategories(totalCategories));
    }
    
    // 카테고리 스테이트 업데이트
    dispatch(setMainCategories(categories));
    dispatch(getDisplayMenu());

    EventRegister.emit("showSpinner",{isSpinnerShow:false, msg:""})
    return {menu:resultData,allItems:allItems};
})

// Slice
export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menu: [],
        displayMenu:[],
        allItems:[],
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(getDisplayMenu.fulfilled,(state, action)=>{
            if(action.payload) {
                state.displayMenu = action.payload;
            }
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
            state.menu = action.payload.menu;
            state.allItems = action.payload.allItems;
        })

    }
});

