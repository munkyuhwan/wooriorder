import axios from "axios";
import { POS_BASE_URL_REAL, POS_BASE_URL_TEST, POS_ORDER_NEW, POS_POST_MENU_EDIT, POS_POST_MENU_STATE, POS_POST_TABLE_LIST, SERVICE_ID, STORE_ID } from "../resources/apiResources";
import { errorHandler, posErrorHandler } from "./errorHandler/ErrorHandler";
import {isEmpty} from "lodash";

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
    const date = new Date();
    //`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`
    return await new Promise(function(resolve, reject){
        axios.post(
            `${POS_BASE_URL_REAL}${POS_POST_MENU_STATE}`,
            {"STORE_ID":STORE_ID,"SERVICE_ID":SERVICE_ID, "UPDATE_CHECK_DTIME":`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`},
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
export const  posMenuEdit = async(dispatch) =>{
    return await new Promise(function(resolve, reject){
        axios.post(
            `${POS_BASE_URL_REAL}${POS_POST_MENU_EDIT}`,
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
            `${POS_BASE_URL_REAL}${POS_POST_TABLE_LIST}`,
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
export const postOrderToPos = async(dispatch, data) =>{
    console.log("postdata: ",
    {
        "STORE_ID":STORE_ID,
        "SERVICE_ID":SERVICE_ID,
        ...data
    }
    );

    
    return await new Promise(function(resolve, reject){
        if(isEmpty(data) ) {
            posErrorHandler(dispatch, {ERRCODE:'XXXX',MSG:"메뉴를 선택 해 주세요.",MSG2:""});
            reject();
            return;
        }
    
        axios.post(
            `${POS_BASE_URL_REAL}${POS_ORDER_NEW}`,
            {
                "STORE_ID":STORE_ID,
                "SERVICE_ID":SERVICE_ID,
                ...data
            },
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