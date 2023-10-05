import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MENU_DATA } from '../resources/menuData';
import { SERVICE_ID, STORE_ID } from '../resources/apiResources';
import { postOrderToPos } from '../utils/apis';
import { grandTotalCalculate } from '../utils/common';
import { isEqual } from 'lodash'

export const setOrderList = createAsyncThunk("order/setOrderList", async(index) =>{
    return index;
})

export const deleteItem = createAsyncThunk("order/deleteItem", async(_,{getState,extra}) =>{
    const {grandTotal, orderList} = getState().order;
    let tmpOrderList = Object.assign([],orderList);
    tmpOrderList.remove(_.index)

    const totalResult = grandTotalCalculate(tmpOrderList)
    return {orderList:tmpOrderList,grandTotal:totalResult.grandTotal,totalItemCnt:totalResult.itemCnt };
})


export const resetAmtOrderList = createAsyncThunk("order/resetAmtOrderList", async(_,{getState,extra}) =>{
    const {grandTotal, orderList} = getState().order;
    const {amt, index, operand} = _;
    
    let tmpOrderList = Object.assign([],orderList);
    const selectedMenu = tmpOrderList[index];
    let itemCnt = selectedMenu?.ITEM_CNT;
    if(operand=="plus") {
        itemCnt +=1;
    }else if(operand=="minus")  {
        itemCnt -=1;
    }else {
        itemCnt = 0;
    }
    if(itemCnt<=0) {
        tmpOrderList.splice(index,1);
        return {orderList:tmpOrderList}
    }
    tmpOrderList[index] = Object.assign({},selectedMenu,{ITEM_CNT:itemCnt});

    const totalResult = grandTotalCalculate(tmpOrderList)
    return {orderList:tmpOrderList,grandTotal:totalResult.grandTotal,totalItemCnt:totalResult.itemCnt };
})

export const addToOrderList =  createAsyncThunk("order/addToOrderList", async(_,{getState,extra}) =>{

    // 선택된 아이템 정보 받기
    const {displayMenu} = getState().menu;
    const {orderList} = getState().order;
    const {menuOptionSelected} = getState().menuDetail;
    const menuDetail = displayMenu.filter(el=>el.ITEM_ID == _.itemID);
    // 기존 주문에 같은 메뉴 있는지 확인
    // 옵션필드 추가
    let additiveList = [];
    if(menuOptionSelected) {
        if(menuOptionSelected.length>0) additiveList=menuOptionSelected;
    }
    var selectedMenuDetail = Object.assign({},menuDetail[0],{"ADDITIVE_ITEM_LIST":additiveList});
    
    var newOrderList = []; // 새 오더 정렬;
   // 중복메뉴
    let duplicatedItem = orderList.filter(el=> (
        el.ITEM_NAME == selectedMenuDetail.ITEM_NAME && 
        el.ITEM_ID==selectedMenuDetail.ITEM_ID && 
        el.SALE_PRICE==selectedMenuDetail.SALE_PRICE &&
        el.SALE_AMT==selectedMenuDetail.SALE_AMT &&
        el.ITEM_MENO==selectedMenuDetail.ITEM_MENO &&
        el.ITEM_SET_GBN==selectedMenuDetail.ITEM_SET_GBN &&
        el.ITEM_USE_FLA==selectedMenuDetail.ITEM_USE_FLA &&
        isEqual(el.ADDITIVE_ITEM_LIST,selectedMenuDetail.ADDITIVE_ITEM_LIST)
    ));    
    var addedOrder = {};
    if(duplicatedItem.length>0) {
        //newOrderList = orderList
        addedOrder = Object.assign({},duplicatedItem[0],{"ITEM_CNT":(Number(duplicatedItem[0].ITEM_CNT)+1),"ADDITIVE_ITEM_LIST":additiveList});       
        newOrderList = Object.assign([],orderList);
        newOrderList[orderList.indexOf(duplicatedItem[0])] = addedOrder;
    }else {
        //addedOrder = Object.assign({},selectedMenuDetail,{"ITEM_CNT":(Number(selectedMenuDetail.ITEM_CNT)+1),"ADDITIVE_ITEM_LIST":[]});
        addedOrder = Object.assign({},selectedMenuDetail,{"ITEM_CNT":1,"ADDITIVE_ITEM_LIST":additiveList});
        newOrderList = Object.assign([],orderList);;
        newOrderList.push(addedOrder);    
    }

    const totalResult = grandTotalCalculate(newOrderList)

    const orderPayData = {
        "STORE_ID": STORE_ID,
        "SERVICE_ID": SERVICE_ID,
        "MCHT_ORDERNO": "120",
        "MEMB_TEL": "01012349876",
        "ORDER_MEMO": "태스트 ",
        "OEG_ORDER_PAY_AMT": `${totalResult}`,
        "ORDER_PAY_AMT": `${totalResult}`,
        "DISC_AMT": "0",
        "PREPAY_FLAG": "Y",
        "OS_GBN": "AND",
        "FLR_CODE": "0001",
        "TBL_CODE": "0005",
        "REPT_PRT_FLAG": "Y",
        "ORDER_PRT_FLAG": "Y",
        "ORDER_PAY_LIST":[
            {
                "PAY_TYPE": "card",
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
        "ITEM_LIST":orderList,
    }

    return {orderList:newOrderList,grandTotal:totalResult.grandTotal,totalItemCnt:totalResult.itemCnt, orderPayData:orderPayData };
    
    // 결제 정보 관련 데이터
    const ordPayList = [
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
        {
            "PAY_TYPE": "card",
            "CAN_FLAG": "N",
            "CAN_PAY_SEQ": "",
            "TML_NO": "CATID_01",
            "SALE_AMT": "13000",
            "SALE_VAT_AMT": "0",
            "SVC_AMT": "0",
            "ISTM_TERM": "01",
            "AUTH_NO": "A012",
            "AUTH_DATE": "2021123",
            "AUTH_TIME": "141921",
            "CARD_ACQHID": "ac01",
            "CARD_ACQ_NAME": "매입사02",
            "CARD_ACSHID": "acs02",
            "CRD_HID_NAME": "발급사명필수",
            "CARD_NO": "0122330345",
            "CARD_MCHTNO": "CMCHTNO_888",
            "CARD_PAY_TYPE": "I",
            "CASH_AUTH_TYPE": "",
            "DDCEDI": "E"
        }
    ]
    /* Post data 
    {
        "STORE_ID": "3100396007",
        "SERVICE_ID": "3001",
        "MCHT_ORDERNO": "120",
        "MEMB_TEL": "01012349876",
        "ORDER_MEMO": "(안종혁)TORDER 선불 주문 테스트 현금 카드 결제",

        "OEG_ORDER_PAY_AMT": "18000",
        "ORDER_PAY_AMT": "18000",
        "DISC_AMT": "0",
        "PREPAY_FLAG": "Y",
        "OS_GBN": "Microsoft Windows [Version 10.0.17763.1935]",
        "FLR_CODE": "0001",
        "TBL_CODE": "0005",
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
            {
                "PAY_TYPE": "card",
                "CAN_FLAG": "N",
                "CAN_PAY_SEQ": "",
                "TML_NO": "CATID_01",
                "SALE_AMT": "13000",
                "SALE_VAT_AMT": "0",
                "SVC_AMT": "0",
                "ISTM_TERM": "01",
                "AUTH_NO": "A012",
                "AUTH_DATE": "2021123",
                "AUTH_TIME": "141921",
                "CARD_ACQHID": "ac01",
                "CARD_ACQ_NAME": "매입사02",
                "CARD_ACSHID": "acs02",
                "CRD_HID_NAME": "발급사명필수",
                "CARD_NO": "0122330345",
                "CARD_MCHTNO": "CMCHTNO_888",
                "CARD_PAY_TYPE": "I",
                "CASH_AUTH_TYPE": "",
                "DDCEDI": "E"
            }
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
            {
                "ITEM_SEQ": "1",
                "ITEM_NAME": "함흥냉면6",
                "ITEM_ID": "2222227",
                "SALE_PRICE": "12000",
                "SALE_AMT": "12000",
                "ITEM_CNT": "2",
                "ITEM_MENO": "함흥냉면차갑게",
                "ITEM_SET_GBN": "N",
                "ADDITIVE_ITEM_LIST": [
                    {
                        "ADDITIVE_ID": "1001",
                        "ADDITIVE_NAME": "시원함",
                        "RULE_ID": "1000",
                        "ADDITIVE_PRICE": "500",
                        "ADDITIVE_CNT": "1"
                    }
                ]
            }
        ]
    }
     */

})
export const postToPos =  createAsyncThunk("order/postToPos", async(_,{dispatch, getState,extra}) =>{
    const {orderPayData} = getState().order;
    return await postOrderToPos(dispatch, orderPayData);
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
        totalItemCnt:0,
        orderList:[],
        orderPayData:{},
    },
    extraReducers:(builder)=>{
        // 주문 셋
        builder.addCase(setOrderList.fulfilled,(state, action)=>{
            state.callServerItems = action.payload;
        })
        // 주문 추가
        builder.addCase(addToOrderList.fulfilled,(state, action)=>{
            //console.log("addToOrderList========",action.payload);
            if(action.payload){
                state.orderList = action.payload.orderList;
                state.grandTotal = action.payload.grandTotal;
                state.totalItemCnt = action.payload.totalItemCnt;
                state.orderPayData = action.payload.orderPayData;
            }
        })
        // 주문 수량 수정
        builder.addCase(resetAmtOrderList.fulfilled,(state, action)=>{
            if(action.payload){
                state.orderList = action.payload.orderList;
                state.grandTotal = action.payload.grandTotal;
                state.totalItemCnt = action.payload.totalItemCnt;
            }
        })
         // 주문 삭제
         builder.addCase(deleteItem.fulfilled,(state, action)=>{
            if(action.payload){
                state.orderList = action.payload.orderList;
                state.grandTotal = action.payload.grandTotal;
                state.totalItemCnt = action.payload.totalItemCnt;
            }
        })
    }
});
