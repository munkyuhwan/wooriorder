import axios from "axios";
import { POS_BASE_URL_REAL, POS_BASE_URL_TEST, POS_ORDER_NEW, POS_POST_MENU_EDIT, POS_POST_MENU_STATE, SERVICE_ID, STORE_ID } from "../resources/apiResources";
import { ErrorHandler } from "./errorHandler/errorHandler";


const posOrderHeadr = {Accept: 'application/json','Content-Type': 'application/json'}

const errorHandler = new ErrorHandler;

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
export const  posMenuState = async (resolve,reject) =>{
    return await new Promise(function(resolve, reject){
        axios.post(
            `${POS_BASE_URL_TEST}${POS_POST_MENU_STATE}`,
            {"STORE_ID":STORE_ID,"SERVICE_ID":SERVICE_ID, "UPDATE_CHECK_DTIME":"20230915"},
            posOrderHeadr,  
        ) 
        .then((response => { 
            console.log("response: ",response.data);
            resolve(response);  
        }))
        .catch(error=>reject(error.response.data));
    })
}
export const  posMenuEdit = async (resolve,reject) =>{
    return await new Promise(function(resolve, reject){
        axios.post(
            `${POS_BASE_URL_REAL}${POS_POST_MENU_EDIT}`,
            {"STORE_ID":STORE_ID},
            posOrderHeadr,  
        ) 
        .then((response => { 
            const data = response.data.OBJ[0].ITEM_GROUP_LIST;
            //errorHandler()
            resolve(data);
        }))
        .catch(error=>reject(error.response.data));
    }) 
}