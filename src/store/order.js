import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MENU_DATA } from '../resources/menuData';
import { SERVICE_ID, STORE_ID } from '../resources/apiResources';

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
        orderPayData:{
            "STORE_ID": STORE_ID,
            "SERVICE_ID": SERVICE_ID,
            "MCHT_ORDERNO": "1",
            "MEMB_TEL": "01012349876",
            "ORDER_MEMO": "(문규환)테스트",
            "OEG_ORDER_PAY_AMT": "18000",
            "ORDER_PAY_AMT": "18000",
            "DISC_AMT": "0",
            "PREPAY_FLAG": "Y",
            "OS_GBN": "Microsoft Windows [Version 10.0.17763.1935]",
            "FLR_CODE": "0001",
            "TBL_CODE": "0001",
            "REPT_PRT_FLAG": "Y",
            "ORDER_PRT_FLAG": "Y",
            "ORD_PAY_LIST": [
                {
                    "PAY_TYPE": "cash",
                    "CAN_FLAG": "N",
                    "CAN_PAY_SEQ": "",
                    "TML_NO": "",
                    "SALE_AMT": "5000",
                    "SALE_VAT_AMT": "0",
                    "SVC_AMT": "0",
                    "ISTM_TERM": "",
                    "AUTH_NO": "",
                    "AUTH_DATE": "",
                    "AUTH_TIME": "",
                    "CARD_ACQHID": "",
                    "CARD_ACQ_NAME": "",
                    "CARD_ACSHID": "",
                    "CRD_HID_NAME": "",
                    "CARD_NO": "",
                    "CARD_MCHTNO": "",
                    "CARD_PAY_TYPE": "",
                    "CASH_AUTH_TYPE": "",
                    "DDCEDI": ""
                },
            ],
            "ITEM_LIST": [
                {
                    "ITEM_SEQ": "1",
                    "ITEM_NAME": "돼지불백",
                    "ITEM_ID": "2222245",
                    "SALE_PRICE": "5000",
                    "SALE_AMT": "5000",
                    "ITEM_CNT": "1",
                    "ITEM_MENO": "돼지불백맞있게",
                    "ITEM_SET_GBN": "N",
                    "ADDITIVE_ITEM_LIST": []
                },
                
            ]
        },
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
