import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MENU_DATA } from '../resources/menuData';
import { SERVICE_ID, STORE_ID } from '../resources/apiResources';
import { addOrderToPos, getOrderByTable, postOrderToPos } from '../utils/apis';
import { grandTotalCalculate, openPopup } from '../utils/common';
import { isEqual } from 'lodash'
import { posErrorHandler } from '../utils/errorHandler/ErrorHandler';

export const initOrderList = createAsyncThunk("order/initOrderList", async() =>{
    return  {
        grandTotal:0,
        totalItemCnt:0,
        orderList:[],
        orderPayData:{},
    };
})


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
    const {tableInfo} = getState().tableInfo;
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

        addedOrder["SALE_PRICE"] = `${addedOrder["ITEM_AMT"]}`;
        addedOrder["SALE_AMT"] = `${addedOrder["ITEM_AMT"]}`;
        addedOrder["ITEM_MEMO"] = ``;
        addedOrder["ITEM_SEQ"] = `${newOrderList.length}`;
        
        newOrderList[orderList.indexOf(duplicatedItem[0])] = addedOrder;
    }else {
        //addedOrder = Object.assign({},selectedMenuDetail,{"ITEM_CNT":(Number(selectedMenuDetail.ITEM_CNT)+1),"ADDITIVE_ITEM_LIST":[]});
        addedOrder = Object.assign({},selectedMenuDetail,{"ITEM_CNT":1,"ADDITIVE_ITEM_LIST":additiveList});

        addedOrder["SALE_PRICE"] = `${addedOrder["ITEM_AMT"]}`;
        addedOrder["SALE_AMT"] = `${addedOrder["ITEM_AMT"]}`;
        addedOrder["ITEM_MEMO"] = ``;
        addedOrder["ITEM_SEQ"] = `${newOrderList.length}`;

        newOrderList = Object.assign([],orderList);;
        newOrderList.push(addedOrder);    
    }
    const totalResult = grandTotalCalculate(newOrderList)

    const orderPayData = {
        "STORE_ID": STORE_ID,
        "SERVICE_ID": SERVICE_ID,
        "MCHT_ORDERNO": "130",
        "MEMB_TEL": "01012349876",
        "ORDER_MEMO": "태스트 ",
        "OEG_ORDER_PAY_AMT": `${totalResult.grandTotal}`,
        "ORDER_PAY_AMT": `${totalResult.grandTotal}`,
        "DISC_AMT": "0",
        "PREPAY_FLAG": "N",
        "OS_GBN": "AND",
        "FLR_CODE": tableInfo.FLR_CODE,
        "TBL_CODE": tableInfo.TBL_CODE,
        "REPT_PRT_FLAG": "N",
        "ORDER_PRT_FLAG": "N",
        "ORD_PAY_LIST":[
            {
                "PAY_TYPE": "card",
                "CAN_FLAG": "N",
                "CAN_PAY_SEQ": "",
                "TML_NO": "CATID_01",
                "SALE_AMT":`${totalResult.grandTotal}`,
                "SALE_VAT_AMT": "0",
                "SVC_AMT": "0",
                "ISTM_TERM": "01",
                "AUTH_NO": "A012",
                "AUTH_DATE": "20231016",
                "AUTH_TIME": "220021",
                "CARD_ACQHID": "ac01",
                "CARD_ACQ_NAME": "국민",
                "CARD_ACSHID": "acs02",
                "CRD_HID_NAME": "국민",
                "CARD_NO": "0122330345",
                "CARD_MCHTNO": "CMCHTNO_888",
                "CARD_PAY_TYPE": "I",
                "CASH_AUTH_TYPE": "P",
                "DDCEDI": "E"
    
            },
        ],
        "ITEM_LIST":newOrderList,
    }
    return {orderList:newOrderList,grandTotal:totalResult.grandTotal,totalItemCnt:totalResult.itemCnt, orderPayData:orderPayData };
})
// 새로 메뉴 등록
export const postToPos =  createAsyncThunk("order/postToPos", async(_,{dispatch, getState,extra}) =>{
    const {orderPayData} = getState().order;
    return await postOrderToPos(dispatch, orderPayData)
    .catch(err=>{
        posErrorHandler(dispatch, {ERRCODE:"XXXX",MSG:"주문 오류",MSG2:"주문을 진행할 수 없습니다."});
        console.log("error: ",err)
    });
})
// 매뉴 추가 등록
export const postAddToPos =  createAsyncThunk("order/postAddToPos", async(_,{dispatch, getState,extra}) =>{
    const {orderPayData} = getState().order;
    var tmpData = orderPayData;
    // 추가 주문에 결제 정보 빼야함.
    tmpData["ORD_PAY_LIST"]=[]
    return await addOrderToPos(dispatch, tmpData)
    .catch(err=>{
        posErrorHandler(dispatch, {ERRCODE:"XXXX",MSG:"주문 오류",MSG2:"주문을 진행할 수 없습니다."});
        console.log("error: ",err)
    });
})
// 테이블 주문 히스토리
export const getOrderStatus = createAsyncThunk("order/getOrderStatus", async(_,{dispatch, getState,extra}) =>{
    const {tableInfo} = getState().tableInfo;
    return await getOrderByTable(dispatch, tableInfo)
    .catch(err=>{
        console.log("error: ",err)
    });
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
        orderStatus:[],
        orgOrderNo:"",
        orderNo:"",
    },
    extraReducers:(builder)=>{
        // 주문 셋
        builder.addCase(setOrderList.fulfilled,(state, action)=>{
            state.orderList = action.payload;
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
        // 주문 초기화
         builder.addCase(initOrderList.fulfilled,(state, action)=>{
            if(action.payload){
                state.orderList = action.payload.orderList;
                state.grandTotal = action.payload.grandTotal;
                state.totalItemCnt = action.payload.totalItemCnt;
                state.orderPayData = action.payload.orderPayData;
            }
        })
        // 새주문 등록
        builder.addCase(postToPos.fulfilled,(state, action)=>{
            
        })
        // 주문 추가등록
        builder.addCase(postAddToPos.fulfilled,(state, action)=>{
            
        })
        // 주문 목록
        builder.addCase(getOrderStatus.fulfilled,(state, action)=>{
            if(action.payload){
                state.orderStatus = action.payload.ORDER_LIST;
            }
        })

    }
});
