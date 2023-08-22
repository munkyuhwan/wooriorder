import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getMainCategories = createAsyncThunk("categories/getMainCategories", async() =>{
    const mainCategories = [
        {index:0, name:"카테고리0"},
        {index:1, name:"카테고리1"},
        {index:2, name:"카테고리2"},
        {index:3, name:"카테고리3"},
        {index:4, name:"카테고리4"},
        {index:5, name:"카테고리5"},
        {index:6, name:"카테고리6"},
        {index:7, name:"카테고리7"},
        {index:8, name:"카테고리8"},
        {index:9, name:"카테고리9"},
        {index:10, name:"카테고리10"},
        {index:11, name:"카테고리11"},]
    return mainCategories;
})
export const setSelectedMainCategory = createAsyncThunk("categories/setSelectedMainCategory", async(index) =>{
    return index;
})
export const getSubCategories = createAsyncThunk("categories/getSubCategories", async() =>{
    const subCategories = [
        {index:0, name:"카테고리0"},
        {index:1, name:"카테고리1"},
        {index:2, name:"카테고리2"},
        {index:3, name:"카테고리3"},
        {index:4, name:"카테고리4"},
        {index:5, name:"카테고리5"},
        {index:6, name:"카테고리6"},
        {index:7, name:"카테고리7"},
        {index:8, name:"카테고리8"},
    ]
    return subCategories;
})
export const setSelectedSubCategory = createAsyncThunk("categories/setSelectedSubCategory", async(index) =>{
    return index;
})
export const setIconClick = createAsyncThunk("categories/setIconClick", async(isOn) =>{
    return isOn;
})
// Slice
export const cagegoriesSlice = createSlice({
    name: 'categories',
    initialState: {
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

