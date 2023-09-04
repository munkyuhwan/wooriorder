import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getMainCategories = createAsyncThunk("categories/getMainCategories", async() =>{
    const mainCategories = [
        {index:0, name:"카테고리0"},
        {index:1, name:"카테고리1"},
        {index:2, name:"카테고리2"},
        {index:3, name:"카테고리3"},
        {index:4, name:"카테고리4"},]
    return mainCategories;
})
export const setSelectedMainCategory = createAsyncThunk("categories/setSelectedMainCategory", async(index,{getState,dispatch}) =>{
    return await new Promise(function(resolve, reject){
        resolve(index);


    })
})
export const getSubCategories = createAsyncThunk("categories/getSubCategories", async(index) =>{
    const subCategories =
    [
        [
            {index:0, name:"메0섭0"},
            {index:1, name:"메0섭1"},
            {index:2, name:"메0섭2"},
        ],
        [
            {index:0, name:"메1섭0"},
            {index:1, name:"메1섭1"},
        ],
        [
            {index:0, name:"메2섭0"},
            {index:1, name:"메2섭1"},
            {index:2, name:"메2섭2"},
            {index:3, name:"메2섭3"},
        ],
        [
            {index:0, name:"메3섭0"},
            {index:1, name:"메3섭1"},
        ],
        [
            {index:0, name:"메4섭0"},
            {index:1, name:"메4섭1"},
            {index:2, name:"메4섭2"},
            {index:3, name:"메4섭3"},
        ],
    ]
    return subCategories[index];
})
export const setSelectedSubCategory = createAsyncThunk("categories/setSelectedSubCategory", async(index) =>{
    return await new Promise(function(resolve, reject){
        resolve(index);
    })})
export const setIconClick = createAsyncThunk("categories/setIconClick", async(isOn) =>{
    return isOn;
})
// Slice
export const cagegoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categoryData:[
            {index:0, name:"카테고리0", subCategories:[{index:0, name:"메0섭0"},{index:1, name:"메0섭1"},{index:2, name:"메0섭2"},]},
            {index:1, name:"카테고리1", subCategories:[{index:1, name:"메1섭0"},{index:1, name:"메1섭1"},]},
            {index:2, name:"카테고리2", subCategories:[{index:2, name:"메2섭0"},{index:1, name:"메2섭1"},{index:1, name:"메2섭2"},]},
            {index:3, name:"카테고리3", subCategories:[{index:3, name:"메3섭0"},{index:1, name:"메3섭1"},{index:1, name:"메3섭2"},{index:1, name:"메3섭3"},]},
            {index:4, name:"카테고리4", subCategories:[{index:4, name:"메4섭0"},{index:1, name:"메4섭1"},]},
        ],
        mainCategories:[],
        selectedMainCategory:0,
        subCategories:[],
        selectedSubCategory:0,
        isIconOn:false,
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(getMainCategories.fulfilled,(state, action)=>{
            state.mainCategories = action.payload;
        })
        // 메인 카테고리 선택
        builder.addCase(setSelectedMainCategory.fulfilled,(state, action)=>{
            state.subCategories = state.categoryData[action.payload].subCategories;
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
        // 아이콘 변경
        builder.addCase(setIconClick.fulfilled,(state, action)=>{
            state.isIconOn = action.payload;
        })
    }
});

