import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SERVICE_ID, STORE_ID } from '../resources/apiResources';
import { addOrderToPos, checkTableOrder, getAdminServices, postOrderToPos } from '../utils/apis';
import LogWriter from '../utils/logWriter';

export const getCallServerItems = createAsyncThunk("callServer/getCallServerItems", async() =>{
    const getCallServerItem = []
    return getCallServerItem;
})
export const setCallServerList = createAsyncThunk("callServer/setCallServerList", async(data) =>{
    return data;
})
export const setCallServerItem = createAsyncThunk("callServer/setCallServerItem", async(index) =>{
    return index;
})

export const getServiceList = createAsyncThunk("callServer/getServiceList", async() =>{
    const serviceList = await getAdminServices();
    return serviceList?.data;
})
export const postAdminSerivceList = createAsyncThunk("callServer/getServiceList", async(data) =>{
    return [];
})
/* 
export const sendServiceToPos = createAsyncThunk("callServer/sendToPos", async(data,{dispatch, getState}) =>{
    const { callServerItems } = getState().callServer;
    const {tableInfo} = getState().tableInfo;
    const serverList = callServerItems.ITEM_LIST

    let selectedItems = [];
    data.map(itemID=>{
        let serviceItem = Object.assign({},serverList.filter(el=>el.ITEM_ID==itemID)[0]);
        serviceItem['ITEM_SEQ'] = "1";
        serviceItem['ITEM_CNT'] = "1";
        serviceItem['SALE_PRICE'] = "0";
        serviceItem['SALE_AMT'] = "0";
        serviceItem['ITEM_MEMO'] = "";
        serviceItem['ADDITIVE_ITEM_LIST'] = [];

        delete serviceItem["ITEM_AMT"];

        //console.log("serviceItem: ",serviceItem);
        selectedItems.push(serviceItem);
    })
    //console.log()
    //console.log(selectedItems)
    let submitData = 
    {
        "STORE_ID": `${STORE_ID}`,
        "SERVICE_ID": `${SERVICE_ID}`,
        "MCHT_ORDERNO": "120",
        "MEMB_TEL": "01012349876",
        "ORDER_MEMO": "직원호출",
        "OEG_ORDER_PAY_AMT": "0",
        "ORDER_PAY_AMT": "0",
        "DISC_AMT": "0",
        "PREPAY_FLAG": "N",
        "OS_GBN": "AND",
        "FLR_CODE": `${tableInfo.FLR_CODE}`,
        "TBL_CODE": `${tableInfo.TBL_CODE}`,
        "REPT_PRT_FLAG": "N",
        "ORDER_PRT_FLAG": "N",
        "ORD_PAY_LIST": [],
        "ITEM_LIST": selectedItems
    }

    const isTableAvailable = await checkTableOrder(dispatch,{tableInfo});
   // console.log("isTableAvailable: ",isTableAvailable)
    //console.log("submitData: ",submitData);


    
    if(isTableAvailable.hasOrderList) {
        submitData["ORD_PAY_LIST"]=[];
        submitData["ORG_ORDERNO"] = isTableAvailable.orderNo;
        return await addOrderToPos(dispatch, submitData)
        .catch(err=>{
            posErrorHandler(dispatch, {ERRCODE:"XXXX",MSG:"주문 오류",MSG2:"주문을 진행할 수 없습니다."});
            console.log("error: ",err)
        }); 
    }else {
        return await postOrderToPos(dispatch, submitData)
        .catch(err=>{
            posErrorHandler(dispatch, {ERRCODE:"XXXX",MSG:"주문 오류",MSG2:"주문을 진행할 수 없습니다."});
            const lw = new LogWriter();
            const logPos = `\nPOST POS DATA ERROR==================================\ndata:${JSON.stringify(err)}\n`
            lw.writeLog(logPos);
        });
    }
    
 
})
 */

// Slice
export const callServerSlice = createSlice({
    name: 'callServer',
    initialState: {
        callServerItems:[],
        selectedItem:0,
    },
    extraReducers:(builder)=>{
        // 메인 카테고리 받기
        builder.addCase(getCallServerItems.fulfilled,(state, action)=>{
            state.callServerItems = action.payload;
        })
        // 메인 카테고리 선택
        builder.addCase(setCallServerItem.fulfilled,(state, action)=>{
            state.selectedItem = action.payload;
        })
        // 직원호출 셋
        builder.addCase(setCallServerList.fulfilled,(state, action)=>{
            state.callServerItems = action.payload;
        })
        // 관리자 직원호출 하기
        builder.addCase(getServiceList.fulfilled,(state, action)=>{
            state.callServerItems = action.payload;
        })
        
    }
});

