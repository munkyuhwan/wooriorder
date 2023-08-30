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

export const startSmartroKeyTransfer = async () =>{
    const {SmartroPay} = NativeModules;
    const smartroData = "{\"service\":\"function\",\"cat-id\":\"1111111111\",\"business-no\":\"1234567890\",\"device-manage\":\"exchange-key\"}";
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

export const startSmartroCheckIntegrity = async () =>{
    const {SmartroPay} = NativeModules;
    const smartroData = "{\"service\":\"function\",\"device-manage\":\"check-integrity\"}";
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

