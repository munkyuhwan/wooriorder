import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MENU_DATA } from '../resources/menuData';

export const getMainCategories = createAsyncThunk("categories/getMainCategories", async() =>{
    return [];
})
export const setMainCategories = createAsyncThunk("categories/setMainCategories", async(_)=>{
    return _;
});

export const setSelectedMainCategory = createAsyncThunk("categories/setSelectedMainCategory", async(index,{getState,dispatch}) =>{
    return await new Promise(function(resolve, reject){
        resolve(index);
    })
})
export const getSubCategories = createAsyncThunk("categories/getSubCategories", async(index) =>{
    return await new Promise(function(resolve, reject){
        const subCat = MENU_DATA.categories[index].subCategories||[];
        if(subCat.length>0) {
            resolve(subCat);
        }else {
            reject([]);
        }
        
    })
})
export const setSelectedSubCategory = createAsyncThunk("categories/setSelectedSubCategory", async(index) =>{
    return await new Promise(function(resolve, reject){
        resolve(index);
    })
})
// Slice
export const cagegoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categoryData:[],
        mainCategories:[],
        selectedMainCategory:0,
        subCategories:[],
        selectedSubCategory:0,
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(getMainCategories.fulfilled,(state, action)=>{
            state.mainCategories = action.payload;
        })
        // 메인 카테고리 업데이트
        builder.addCase(setMainCategories.fulfilled,(state, action)=>{
            state.mainCategories = action.payload;
        })
        // 메인 카테고리 선택
        builder.addCase(setSelectedMainCategory.fulfilled,(state, action)=>{
            state.subCategories = MENU_DATA.categories[action.payload].subCategories||[]
            state.selectedMainCategory = action.payload;
        })
        // 서브 카테고리 받기
        builder.addCase(getSubCategories.fulfilled,(state, action)=>{
            state.subCategories = action.payload;
        })
        // 서브 카테고리 선택
        builder.addCase(setSelectedSubCategory.fulfilled,(state, action)=>{
            state.selectedSubCategory = action.payload;
        })
    }
});

