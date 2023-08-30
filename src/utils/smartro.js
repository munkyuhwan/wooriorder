import { NativeModules } from 'react-native'

export const startSmartroPay = (callback) =>{
    const {SmartroPay} = NativeModules;
    SmartroPay.prepareSmartroPay("{\"service\":\"function\",\"external-manage\":\"get-signature\",\"service-result\":\"0800\",\"service-description\":\"서비스가 중단되었습니다.\"}");
}

export const startSmartroGetDeviceInfo = async () =>{
    const {SmartroPay} = NativeModules;
    const smartroData = "{\"service\":\"function\",\"device-manage\":\"get-info\"}";
    return await new Promise(function(resolve, reject){
        SmartroPay.prepareSmartroPay(
            smartroData,
            (error)=>{
                reject(error);
            },
            (msg)=>{
                resolve(msg);
            })
        ;
    })
}