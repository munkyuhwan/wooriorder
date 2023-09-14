import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MENU_DATA } from '../resources/menuData';

export const setOrderList = createAsyncThunk("order/setOrderList", async(index) =>{
    return index;
})
export const addToOrderList =  createAsyncThunk("order/addToOrderList", async(_,{getState,extra}) =>{
    const menuDetail = _.menuDetail;
    const {grandTotal} = getState().order;
    const selectedOptions = _.selectedOptions||[];
    const selectedRecommend = _.selectedRecommend||[];

    var totalPrice = Number(menuDetail.price)+grandTotal;
    for(var i=0;i<selectedOptions.length;i++) {
        const optionsInfo = MENU_DATA.options[selectedOptions[i]];
        totalPrice+=Number(optionsInfo.price);
    }
    //const optData= MENU_DATA.options[el];
    var orderMenu = [{menuIndex:_.menuDetailIndex,selectedOptions:selectedOptions}];
    
    for(var i=0;i<selectedRecommend.length;i++) {
        const recommendInfo = MENU_DATA.menuAll[selectedRecommend[i]];
        orderMenu.push({menuIndex:selectedRecommend[i],selectedOptions:[]})
        totalPrice+=Number(recommendInfo.price);
    }
    
    return {orderList:orderMenu, grandTotal:totalPrice};
})
// Slice
export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        grandTotal:0,
        orderList:[],
    },
    extraReducers:(builder)=>{
        // 주문 셋
        builder.addCase(setOrderList.fulfilled,(state, action)=>{
            state.callServerItems = action.payload;
        })
        // 주문 추가
        builder.addCase(addToOrderList.fulfilled,(state, action)=>{
            state.orderList = [...state.orderList,...action.payload.orderList];
            state.grandTotal = action.payload.grandTotal;
        })
    }
});
