import axios from "axios";
import { ADMIN_BASE_URL, ADMIN_GOODS, ADMIN_OPTION, POS_BASE_URL_REAL, POS_BASE_URL_TEST, POS_ORDER_ADD, POS_ORDER_NEW, POS_POST_MENU_EDIT, POS_POST_MENU_STATE, POS_POST_ORDER, POS_POST_ORDER_CANCEL, POS_POST_TABLE_LIST, SERVICE_ID, STORE_ID } from "../resources/apiResources";
import { errorHandler, posErrorHandler } from "./errorHandler/ErrorHandler";
import {isEmpty} from "lodash";
import { numberPad, openPopup } from "./common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initOrderList } from "../store/order";
import { setCartView } from "../store/cart";
import LogWriter from "./logWriter";

const posOrderHeadr = {Accept: 'application/json','Content-Type': 'application/json'}
const adminOrderHeader = {'Content-Type' : "text/plain"};


export const  posOrderNew = async (resolve,reject) =>{
    return await new Promise(function(resolve, reject){
        axios.post(
            `${POS_BASE_URL_TEST}${POS_ORDER_NEW}`,
            {"STORE_ID":STORE_ID,"SERVICE_ID":SERVICE_ID},
            posOrderHeadr, 
        ) 
        .then((response => { 
            resolve(response);
        })) 
        .catch(error=>reject(error.response.data));
    })
}
export const  posMenuState = async (dispatch) =>{
    var lastUpdate="";
    try {
        lastUpdate = await AsyncStorage.getItem("lastUpdate");
        if(lastUpdate == null || lastUpdate== "") {
            lastUpdate = `20200101000000`;
        }
    }catch(err) {
        lastUpdate = `20200101000000`;
    }
    return await new Promise(function(resolve, reject){
        axios.post(
            `${POS_BASE_URL_TEST}${POS_POST_MENU_STATE}`,
            {"STORE_ID":STORE_ID,"SERVICE_ID":SERVICE_ID, "UPDATE_CHECK_DTIME":lastUpdate},
            posOrderHeadr,  
        ) 
        .then((response => { 
            if(posErrorHandler(dispatch, response.data)){
                const data = response.data;
                resolve(data); 
            }else {
                reject();
            } 
        }))
        .catch(error=>reject(error.response.data));
    })
}
// 포스 메뉴 받기
export const  posMenuEdit = async(dispatch) =>{
    return await new Promise(function(resolve, reject){
        axios.post(
            `${POS_BASE_URL_TEST}${POS_POST_MENU_EDIT}`,
            {"STORE_ID":STORE_ID},
            posOrderHeadr,
        ) 
        .then((response => {
            if(posErrorHandler(dispatch, response.data)){
                const data = response.data.OBJ[0].ITEM_GROUP_LIST;
                resolve(data); 
            }else {
                reject();
            } 
        })) 
        .catch(error=>reject(error.response.data));
    }) 
}
// 관리자 메뉴 받기
export const adminMenuEdit = async(dispatch) => {
    //let data = '{"STORE_ID":12312001}'
    return await new Promise(function(resolve, reject){
        axios.post(
            `${ADMIN_BASE_URL}${ADMIN_GOODS}`,
            {"STORE_ID":STORE_ID},
            adminOrderHeader,
        ) 
        .then((response => {
            if(posErrorHandler(dispatch, response.data)){
                const data = response.data;
                resolve(data); 
            }else {
                reject();
            } 
        })) 
        .catch(error=>reject(error.response.data));
    })
}
// 관리자 옵션 받기
export const adminOptionEdit = async(dispatch) => {
    //let data = '{"STORE_ID":12312001}'
    return await new Promise(function(resolve, reject){
        axios.post(
            `${ADMIN_BASE_URL}${ADMIN_OPTION}`,
            {"STORE_ID":STORE_ID},
            adminOrderHeader,
        ) 
        .then((response => {
            if(posErrorHandler(dispatch, response.data)){
                const data = response.data;
                resolve(data); 
            }else {
                reject();
            } 
        })) 
        .catch(error=>reject(error.response.data));
    })
}


export const posTableList = async(dispatch) =>{
    return await new Promise(function(resolve, reject){
        axios.post(
            `${POS_BASE_URL_TEST}${POS_POST_TABLE_LIST}`,
            {"STORE_ID":STORE_ID,"SERVICE_ID":SERVICE_ID},
            posOrderHeadr,
        )  
        .then((response => {
            if(posErrorHandler(dispatch, response.data)){
                const data = response.data.OBJ.TABLE_LIST;
                resolve(data); 
            }else {
                reject();
            } 
        })) 
        .catch(error=>reject(error.response.data));
    }) 
}
// 새로운 오더
export const postOrderToPos = async(dispatch, data) =>{
    return await new Promise(function(resolve, reject){
        if(isEmpty(data) ) {
            posErrorHandler(dispatch, {ERRCODE:'XXXX',MSG:"메뉴를 선택 해 주세요.",MSG2:""});
            reject();
            return;
        }
    
        axios.post(
            `${POS_BASE_URL_TEST}${POS_ORDER_NEW}`,
            {
                "STORE_ID":STORE_ID,
                "SERVICE_ID":SERVICE_ID,
                ...data
            },
            posOrderHeadr,
        )  
        .then((response => {
            const lw = new LogWriter();
            const logPosResponse = `\nPOST POS RESPONSE DATA==================================\ndata:${JSON.stringify(response)}\n`
            lw.writeLog(logPosResponse);

            if(posErrorHandler(dispatch, response.data)){
                const responseData = response.data
                if(responseData){
                    if(responseData?.OBJ) {
                        console.log(responseData?.OBJ);
                        const orderNo = responseData?.OBJ?.ORDERNO;
                        const orgOrderNo = responseData?.OBJ?.ORG_ORDERNO;
                        const mchtOrderNo = responseData?.OBJ?.MCHT_ORDERNO;
                        const posOrderNo = responseData?.OBJ?.POS_ORDERNO;
                        const orderData = {"ORDERNO":orderNo,"ORG_ORDERNO":orgOrderNo,"MCHT_ORDERNO":mchtOrderNo, }
                        AsyncStorage.setItem("orderResult",JSON.stringify(orderData));
                    }
                }
                openPopup(dispatch,{innerView:"OrderComplete", isPopupVisible:true});
                dispatch(initOrderList());
                dispatch(setCartView(false));
                resolve(responseData); 
            }else {
                reject();
            } 
        }))
        .catch(error=>reject(error.response.data));
    }) 
}
// 오더 추가
export const addOrderToPos = async(dispatch, data) =>{
    return await new Promise(function(resolve, reject){
        if(isEmpty(data) ) {
            posErrorHandler(dispatch, {ERRCODE:'XXXX',MSG:"메뉴를 선택 해 주세요.",MSG2:""});
            reject();
            return;
        }
        
        axios.post(
            `${POS_BASE_URL_TEST}${POS_ORDER_ADD}`,
            {
                "STORE_ID":STORE_ID,
                "SERVICE_ID":SERVICE_ID,
                ...data
            },
            posOrderHeadr,
        )  
        .then((response => {
            const lw = new LogWriter();
            const logPos = `\nPOST POS ADD DATA RESPONSE==================================\ndata:${JSON.stringify(response)}\n`
            lw.writeLog(logPos);
            
            if(posErrorHandler(dispatch, response.data)){
                const responseData = response.data
                openPopup(dispatch,{innerView:"OrderComplete", isPopupVisible:true});
                dispatch(initOrderList());
                dispatch(setCartView(false));
                resolve(responseData); 
            }else {
                reject();
            } 
        })) 
        .catch(error=>reject(error.response.data));
    }) 
}
// 테이블 주문 체크
export const checkTableOrder = async(dispatch, data ) => {
    return await new Promise(function(resolve, reject){
        if(isEmpty(data.tableInfo) ) {
            posErrorHandler(dispatch, {ERRCODE:'XXXX',MSG:"테이블을 선택 해 주세요.",MSG2:""});
            reject();
            return;
        }
        console.log("============================================================================");
        console.log("tableINfo: ",data.tableInfo);
        axios.post(
            `${POS_BASE_URL_TEST}${POS_POST_ORDER}`,
            {
                "STORE_ID":STORE_ID,
                "SERVICE_ID":SERVICE_ID,
                "FLR_CODE":data.tableInfo.FLR_CODE,
                "TBL_CODE":data.tableInfo.TBL_CODE,
            },
            posOrderHeadr,
        )  
        .then( response => {
            if(posErrorHandler(dispatch, response.data)){
                const data = response.data;
                const obj = data.OBJ;
                const orderList = obj.ORDER_LIST;
                console.log("check data: ",data);
                console.log("check obj: ",obj);
                console.log("check orderList: ",orderList[0].ORG_ORDERNO);
                console.log("check orderList ORD_PAY_LIST: ",orderList[0].ORD_PAY_LIST);
                console.log("============================================================================");
                console.log();
                console.log();

                if(orderList.length > 0 ) {
                    resolve({hasOrderList:true, orderNo:orderList[0].ORDERNO })
                }else {
                    resolve({hasOrderList:false, orderNo:null})
                }
            }
        })
        .catch(err=>{
            console.log("check err: ",err);
            reject();

        })
    });
}

export const cancelOrder = async(dispatch, data) => {
    return await new Promise(function(resolve, reject){
        if(isEmpty(data.tableInfo) ) {
            posErrorHandler(dispatch, {ERRCODE:'XXXX',MSG:"테이블을 선택 해 주세요.",MSG2:""});
            reject();
            return;
        }
        console.log("============================================================================");
        console.log("tableINfo: ",data.tableInfo);
        axios.post(
            `${POS_BASE_URL_TEST}${POS_POST_ORDER_CANCEL}`,
            {
                "STORE_ID":STORE_ID,
                "SERVICE_ID":SERVICE_ID,
                "ORG_ORDERNO":"TO202311020006162",
                "ORD_PAY_LIST":[{"AUTH_DATE": "", "AUTH_NO": "", "AUTH_TIME": "", "BEE_AUTH_DATE": "", "BEE_AUTH_NO": "", "BEE_AUTH_TIME": "", "CAN_FLAG": "", "CAN_PAY_SEQ": 0, "CARD_ACQHID": "", "CARD_ACQ_NAME": "", "CARD_ACSHID": "", "CARD_MCHTNO": "", "CARD_NO": "", "CARD_PAY_TYPE": "", "CASH_AUTH_TYPE": "", "CRD_HID_NAME": "", "DDCEDI": "", "ISTM_TERM": "", "ORDERNO": "", "PAY_SEQ": 0, "PAY_TYPE": "", "SALE_AMT": 0, "SALE_VAT_AMT": 0, "SVC_AMT": 0, "TML_NO": ""}]
            },
            posOrderHeadr,
        )  
        .then( response => {
            if(posErrorHandler(dispatch, response.data)){
               
                resolve();
            }
        })
        .catch(err=>{
            console.log("check err: ",err);
            reject();

        })
    });

}

// 테이블 주문목록 받아오기
export const getOrderByTable = async(dispatch, data) => {
    return await new Promise(function(resolve, reject){
        if(isEmpty(data.tableInfo) ) {
            posErrorHandler(dispatch, {ERRCODE:'XXXX',MSG:"테이블을 선택 해 주세요.",MSG2:""});
            reject();
            return;
        }
        
        axios.post(
            `${POS_BASE_URL_TEST}${POS_POST_ORDER}`,
            {
                "STORE_ID":STORE_ID,
                "SERVICE_ID":SERVICE_ID,
                "FLR_CODE":data.tableInfo.FLR_CODE,
                "TBL_CODE":data.tableInfo.TBL_CODE,
            },
            posOrderHeadr,
        )  
        .then( (response => {
            console.log("response: ",response);
            if(posErrorHandler(dispatch, response.data)){
                const responseData = response.data
                if(responseData.RESULT=="SUCCESS") {
                    const obj = responseData.OBJ;
                    const orderList = obj.ORDER_LIST;
                    console.log("orderList============================================================");
                    console.log("orderList: ",orderList);
                    const orderData = JSON.parse(data?.orderData);
                    console.log("data : ",orderData.ORG_ORDERNO);
                    console.log("orderList: ",orderList[0].ORG_ORDERNO);
                    const filteredData = orderList.filter(el=>el.ORG_ORDERNO == orderData.ORG_ORDERNO);
                    console.log("filteredData: ",filteredData);
                    resolve(filteredData); 
                }else {
                    reject();
                }
            }else {
                reject();
            } 
        })) 
        .catch(error=>reject(error.response.data));
    })
}


[
    {"DISC_AMT": "0", 
    "FLR_CODE": "0001",
     "ITEM_LIST": [[Object], [Object], [Object]], 
     "MCHT_ORDERNO": "130", 
     "MEMB_TEL": "01012349876", 
     "ORDERNO": "TO202310180006066",
    "ORDER_DATE": "20231018",
    "ORDER_MEMO": "태스트 ",
    "ORDER_PAY_AMT": "35000", 
    "ORDER_PRT_FLAG": "N", 
    "ORDER_STATUS": "SMRO000069", 
    "ORDER_STATUS_NAME": "완료", 
    "ORDER_TIME": "012702", 
    "ORD_PAY_LIST": [[Object], [Object]], 
    "ORG_ORDERNO": "TO202310180006066", 
    "ORG_ORDER_PAY_AMT": "35000", 
    "OS_GBN": "", "POS_ORDERNO": "", 
    "PREPAY_FLAG": "N", 
    "REPT_PRT_FLAG": "N", 
    "SERVICE_ID": "3010", 
    "STORE_ID": "3113810001", 
    "SUCCESS_FLAG": "", 
    "TBL_CODE": "0002"}]
