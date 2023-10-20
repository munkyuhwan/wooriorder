import { NativeModules } from 'react-native'
import { BASIC_DATA, BUSINESS_NO, DEVICE_NO } from '../resources/cardReaderConstant';

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
    const smartroData = `{"service":"function","cat-id":"${DEVICE_NO}","business-no":"${BUSINESS_NO}","device-manage":"exchange-key"}`;
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
    const smartroData = `{"type":"credit","deal":"approval","surtax":"82","tip":"100","total-amount":"1004","cat-id":"${DEVICE_NO}","business-no":"${BUSINESS_NO}","need-card-no":"y","member-type":"VAN","van-comm":"[eth, test]","pg-comm":"[eth, test]","security-comm":"[eth, test]"}`;
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

export const serviceIndicate = async () => {
    const {SmartroPay} = NativeModules;
    const smartroData = {"service":"indicate","available":"com"};
    return await new Promise(function(resolve, reject){
        SmartroPay.prepareSmartroPay(
            JSON.stringify(smartroData),
            (error)=>{
                reject(error);
            },
            (msg)=>{
                resolve(msg);
            });
    })
}
export const serviceSetting = async () =>{
    const {SmartroPay} = NativeModules;
    const smartroData = {"service":"setting","device":"dongle", "device-comm":["com","auto-detection"],"additional-device":""};
    return await new Promise(function(resolve, reject){
        SmartroPay.prepareSmartroPay(
            JSON.stringify(smartroData),
            (error)=>{
                reject(error);
            },
            (msg)=>{
                resolve(msg);
            });
    })
}
export const serviceGetting = async () => {
    const {SmartroPay} = NativeModules;
    const smartroData = {"service":"getting","device":"dongle", "device-comm":["com","auto-detection"],"additional-device":""};
    return await new Promise(function(resolve, reject){
        SmartroPay.prepareSmartroPay(
            JSON.stringify(smartroData),
            (error)=>{
                reject(error);
            },
            (msg)=>{
                resolve(msg);
            });
    })
}
export const serviceFunction =async () => {
    const {SmartroPay} = NativeModules;
    const smartroData = {"service":"function","device-manage":"exchange-key","cat-id":DEVICE_NO,"business-no":BUSINESS_NO,}
    return await new Promise(function(resolve, reject){
        SmartroPay.prepareSmartroPay(
            JSON.stringify(smartroData),
            (error)=>{
                reject(error);
            },
            (msg)=>{
                resolve(msg);
            });
    })
}


export const varivariTest = async() =>{
    const {SmartroPay} = NativeModules;
    // 사용 가능한 통신장치 정보 확인
    //const smartroData = `{"service":"indicate","available":"com"}`;
    // auto-detection, Ftdi1

    // setting 
    //const smartroData = {"service":"setting","device":"dongle", "device-comm":["com","auto-detection"],"additional-device":""};

    // getting
    //const smartroData = {"service":"getting","device":"dongle", "device-comm":["com","auto-detection"],"additional-device":""};

    // function device-manage exchange key
    //const smartroData = {"service":"function","device-manage":"exchange-key","cat-id":DEVICE_NO,"business-no":BUSINESS_NO,}

    // function device-manage check-integrity
    //const smartroData = {"service":"function","device-manage":"check-integrity",...BASIC_DATA};

    // getting-data last-payment 
    //const smartroData = {"service":"function","getting-data":"last-payment",...BASIC_DATA};

    // service payment 결제 승인 요청
    //const smartroData = {"service":"payment", "type":"credit", "deal":"approval", "persional-id":"01040618432","total-amount":"10", ...BASIC_DATA};
    // service payment 결제 취소 요청
    //const smartroData = {"service":"payment", "type":"credit", "deal":"cancellation", "persional-id":"01040618432","total-amount":"10", "approval-no":"10556666","approval-date":"231020", ...BASIC_DATA};

    return await new Promise(function(resolve, reject){
        SmartroPay.prepareSmartroPay(
            JSON.stringify(smartroData),
            (error)=>{
                reject(error);
            },
            (msg)=>{
                resolve(msg);
            });
    })
}


