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

// Slice
export const cagegoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        mainCategories:[],
        selectedMainCategory:0,
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(getMainCategories.pending,(state, action)=>{
            state.mainCategories = action.payload;
        })
        builder.addCase(getMainCategories.fulfilled,(state, action)=>{
            state.mainCategories = action.payload;
        })
        builder.addCase(getMainCategories.rejected,(state, action)=>{
            state.mainCategories = action.payload;
        })
        // 메인 카테고리 선택
        builder.addCase(setSelectedMainCategory.fulfilled,(state, action)=>{
            state.selectedMainCategory = action.payload;
        })
    }
});

