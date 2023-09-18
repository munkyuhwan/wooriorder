import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MENU_DATA } from '../resources/menuData';

export const setOrderList = createAsyncThunk("order/setOrderList", async(index) =>{
    return index;
})
export const addToOrderList =  createAsyncThunk("order/addToOrderList", async(_,{getState,extra}) =>{
    console.log("item id: ",_);

    // 선택된 아이템 정보 받기
    const {displayMenu} = getState().menu;
    const {grandTotal, orderList} = getState().order;

    const menuDetail = displayMenu.filter(el=>el.ITEM_ID == _.itemID);
    console.log("selectedMenuDetail: ",menuDetail[0])
    const price = Number(menuDetail[0].ITEM_AMT)
    console.log("price: ",price)

    //const selectedOptions = _.selectedOptions||[];
    //const selectedRecommend = _.selectedRecommend||[];
    let tmpOrderList = orderList;
    console.log("orderListbefore: ",tmpOrderList);
     console.log("orderListafter: ",orderList);
    var totalPrice = Number(price)+grandTotal;
    //return {orderList:orderMenu, grandTotal:totalPrice};

    return ;
})
/* 
export const addToOrderList =  createAsyncThunk("order/addToOrderList", async(_,{getState,extra}) =>{
    console.log("menuDetail: ",_.menuDetail);
    const menuDetail = _.menuDetail;
    const {grandTotal, orderList} = getState().order;
    const selectedOptions = _.selectedOptions||[];
    const selectedRecommend = _.selectedRecommend||[];
    let currentOrderList = orderList;
    // 최초 카트에 추가할떄
    var orderAmt = 1;
    var orderData = {menuIndex:_.menuDetailIndex,selectedOptions:selectedOptions, amount:orderAmt};

    // 기존에 카트에 있는지 체크
    const requestedOrderData = {menuIndex:_.menuDetailIndex,selectedOptions:selectedOptions}
    if(currentOrderList.length>0) {
        currentOrderList.map((el, index)=>{
            let prevEl = el;
            // amount 빼고 같은값이 있나 비교
            const {amount, ...obj} = prevEl;
            prevEl = obj;
            if(JSON.stringify(prevEl) == JSON.stringify(requestedOrderData) ) {
                const prevOrderAmt = el.amount;
                return {menuIndex:el.menuIndex,selectedOptions:el.selectedOptions, amount:Number(prevOrderAmt)+1};
            }else {
                console.log('중복 아님');
                return {menuIndex:_.menuDetailIndex,selectedOptions:selectedOptions, amount:orderAmt};
            }
        })   
    }
    console.log("currentOrderList: ",currentOrderList);

    var totalPrice = Number(menuDetail.price)+grandTotal;
    for(var i=0;i<selectedOptions.length;i++) {
        // 총합계 계산
        totalPrice+=Number(MENU_DATA.options[selectedOptions[i]].price);
    }
    //const optData= MENU_DATA.options[el];
    var orderMenu = [orderData];
    for(var i=0;i<selectedRecommend.length;i++) {
        // 메뉴 추가
        orderMenu.push({menuIndex:selectedRecommend[i],selectedOptions:[]})
        // 총합계 계산
        totalPrice+=Number(MENU_DATA.menuAll[selectedRecommend[i]].price);
    }
    
    return {orderList:orderMenu, grandTotal:totalPrice};
}) 
*/
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
