import { NativeModules } from 'react-native'

export const startSmartroPay = async (callback) =>{
    const {SmartroPay} = NativeModules;
    const smartroData=("{\"service\":\"function\",\"external-manage\":\"get-signature\",\"service-result\":\"0800\",\"service-description\":\"서비스가 중단되었습니다.\"}");
    return await new Promise(function(resolve, reject){
        SmartroPay.prepareSmartroPay(
            smartroData,
            (error)=>{
                reject(error);
            },
            (msg)=>{
                resolve(msg);
            })
    })
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
    });
}

export const startSmartroReadCardInfo = async () =>{
    const {SmartroPay} = NativeModules;
    const smartroData = "{\"service\":\"function\",\"getting-data\":\"card-no-via-device\",\"type\":\"1\"}";
    return await new Promise(function(resolve, reject){
        SmartroPay.prepareSmartroPay(
            smartroData,
            (error)=>{
                reject(error);
            },
            (msg)=>{
                resolve(msg);
            });
    })
}

export const startSmartroGetDeviceSetting = async () =>{
    const {SmartroPay} = NativeModules;
    const smartroData = "{\"service\":\"getting\"}";
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

export const startSmartroSetDeviceDefaultSetting = async () =>{
    const {SmartroPay} = NativeModules;
    const smartroData = "{\"service\":\"setting\",\"device\":\"dongle\",\"device-comm\":[\"com\",\"ftdi1\",\"115200\"],\"additional-device\":\"virtualpad\"}";
    return await new Promise(function(resolve, reject){
        SmartroPay.prepareSmartroPay(
            smartroData,
            (error)=>{
                reject(error);
            },
            (msg)=>{
                resolve(msg);
            });
    })
}

//{"type":"credit","deal":"approval","surtax":"82","tip":"100","total-amount":"1004","cat-id":"1111111111","business-no":"1234567890","need-card-no":"y","member-type":"VAN","van-comm":"[eth, test]","pg-comm":"[eth, test]","security-comm":"[eth, test]"}
export const startSmartroRequestPayment = async () =>{
    const {SmartroPay} = NativeModules;
    const smartroData = `{"type":"credit","deal":"approval","surtax":"82","tip":"100","total-amount":"1004","cat-id":"1111111111","business-no":"1234567890","need-card-no":"y","member-type":"VAN","van-comm":"[eth, test]","pg-comm":"[eth, test]","security-comm":"[eth, test]"}`;
    return await new Promise(function(resolve, reject){
        SmartroPay.prepareSmartroPay(
            smartroData,
            (error)=>{
                reject(error);
            },
            (msg)=>{
                resolve(msg);
            });
    })
}

export const indicateAvailableDeviceInfo = async () => {
    const {SmartroPay} = NativeModules;
    const smartroData = `{"service":"indicate","available":"com"}`;
    return await new Promise(function(resolve, reject){
        SmartroPay.prepareSmartroPay(
            smartroData,
            (error)=>{
                reject(error);
            },
            (msg)=>{
                resolve(msg);
            });
    })
}
