import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MENU_DATA } from '../resources/menuData';

export const setOrderList = createAsyncThunk("order/setOrderList", async(index) =>{
    return index;
})
export const addToOrderList =  createAsyncThunk("order/addToOrderList", async(_,{getState,extra}) =>{
    console.log("addToOrderList============================================");
    const {menuDetail} = getState().menuDetail;
    const {grandTotal} = getState().order;
    var totalPrice = Number(menuDetail.price)+grandTotal;
    for(var i=0;i<_.selectedOptions.length;i++) {
        const optionsInfo = MENU_DATA.options[_.selectedOptions[i]];
        totalPrice+=Number(optionsInfo.price);
    }
    //const optData= MENU_DATA.options[el];
    var orderMenu = [{menuIndex:_.menuDetailIndex,selectedOptions:_.selectedOptions}];
    
    for(var i=0;i<_.selectedRecommend.length;i++) {
        const recommendInfo = MENU_DATA.menuAll[_.selectedRecommend[i]];
        orderMenu.push({menuIndex:_.selectedRecommend[i],selectedOptions:[]})
        totalPrice+=Number(recommendInfo.price);
    }
    
    console.log(orderMenu," totalPrice:",totalPrice);
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
            state.orderList = action.payload.orderList;
            state.grandTotal = action.payload.grandTotal;
        })
    }
});
