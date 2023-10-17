import axios from "axios";
import { POS_BASE_URL_REAL, POS_BASE_URL_TEST, POS_ORDER_ADD, POS_ORDER_NEW, POS_POST_MENU_EDIT, POS_POST_MENU_STATE, POS_POST_ORDER, POS_POST_TABLE_LIST, SERVICE_ID, STORE_ID } from "../resources/apiResources";
import { errorHandler, posErrorHandler } from "./errorHandler/ErrorHandler";
import {isEmpty} from "lodash";
import { numberPad, openPopup } from "./common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initOrderList } from "../store/order";
import { setCartView } from "../store/cart";

const posOrderHeadr = {Accept: 'application/json','Content-Type': 'application/json'}


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
// 메뉴 받기
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
            if(posErrorHandler(dispatch, response.data)){
                const responseData = response.data
                if(responseData){
                    console.log('response data: ',responseData);
                    if(responseData?.OBJ) {
                        const orderNo = responseData?.OBJ?.ORDERNO;
                        const orgOrderNo = responseData?.OBJ?.ORG_ORDERNO;
                        const mchtOrderNo = responseData?.OBJ?.MCHT_ORDERNO;
                        const posOrderNo = responseData?.OBJ?.POS_ORDERNO;

                        AsyncStorage.setItem("orderNo",orderNo);
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
// 테이블 주문목록 받아오기
export const getOrderByTable = async(dispatch, data) => {
    return await new Promise(function(resolve, reject){
        if(isEmpty(data) ) {
            posErrorHandler(dispatch, {ERRCODE:'XXXX',MSG:"테이블을 선택 해 주세요.",MSG2:""});
            reject();
            return;
        }
        console.log({
            "STORE_ID":STORE_ID,
            "SERVICE_ID":SERVICE_ID,
            "FLR_CODE":data.FLR_CODE,
            "TBL_CODE":data.TBL_CODE,
        });

        axios.post(
            `${POS_BASE_URL_TEST}${POS_POST_ORDER}`,
            {
                "STORE_ID":STORE_ID,
                "SERVICE_ID":SERVICE_ID,
                "FLR_CODE":data.FLR_CODE,
                "TBL_CODE":data.TBL_CODE,
            },
            posOrderHeadr,
        )  
        .then((response => {
            if(posErrorHandler(dispatch, response.data)){
                const responseData = response.data
                resolve(responseData.OBJ); 
            }else {
                reject();
            } 
        })) 
        .catch(error=>reject(error.response.data));
    })
}