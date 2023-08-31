import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SettingButtonText, SettingButtonWrapper, SettingWrapper } from '../../styles/common/settingStyle';
import { Alert, DeviceEventEmitter, TouchableWithoutFeedback } from 'react-native';
import { startSmartroCheckIntegrity, startSmartroGetDeviceInfo, startSmartroGetDeviceSetting, startSmartroKeyTransfer, startSmartroReadCardInfo, startSmartroRequestPayment, startSmartroSetDeviceDefaultSetting } from '../../utils/smartro';

const SettingPopup = () =>{

    const getDeviceInfo = () =>{
        startSmartroGetDeviceInfo()
        .then((result)=>{
            const jsonResult=JSON.parse(result);
            displayOnAlert("단말기 정보",jsonResult);
        })
        .catch((error)=>{
            console.log("error: ",error)
        })
    }

    const deviceKeyTransfer = () => {
        startSmartroKeyTransfer()
        .then((result)=>{
            const jsonResult=JSON.parse(result);
            displayOnAlert("키교환",jsonResult);
        })
        .catch((error)=>{
            console.log("error: ",error)
        })
    }

    const checkDeviceIntegrity = () =>{
        startSmartroCheckIntegrity()
        .then((result)=>{
            const jsonResult=JSON.parse(result);
            displayOnAlert("무결성 점검",jsonResult);
        })
        .catch((error)=>{
            console.log("error: ",error)
        })
    }

    const getCardInfo = () =>{
        startSmartroReadCardInfo()
        .then((result)=>{
            const jsonResult=JSON.parse(result);
            displayOnAlert("카드정보",jsonResult);
        })
        .catch((error)=>{
            console.log("error: ",error)
        })
    }
    
    const getDeviceSetting = () =>{
        startSmartroGetDeviceSetting()
        .then((result)=>{
            const jsonResult=JSON.parse(result);
            displayOnAlert("장치 설정",jsonResult);
        })
        .catch((error)=>{
            console.log("error: ",error)
        })
    }

    const getDeviceDefaultSetting = () =>{
        startSmartroSetDeviceDefaultSetting()
        .then((result)=>{
            const jsonResult=JSON.parse(result);
            displayOnAlert("장치 설정",jsonResult);
        })
        .catch((error)=>{
            console.log("error: ",error)
        })
    }
    const testPayment = () => {
        startSmartroRequestPayment()
        .then((result)=>{
            const jsonResult=JSON.parse(result);
            displayOnAlert("결제 결과",jsonResult);
        })
        .catch((error)=>{
            console.log("error: ",error)
        })
    }



    const displayOnAlert = (title, jsonResult) => {
        const objKeys = Object.keys(jsonResult)
        var str = "";
        for(var i=0; i<objKeys.length; i++) {
            str += `${objKeys[i]}: ${jsonResult[objKeys[i]]}\n`;
        }
        Alert.alert(
            title,
            str,
            [{
                text:'확인',
            }]
        )
    }


    return (
        <>
            <SettingWrapper>
                <SettingButtonWrapper>
                    <TouchableWithoutFeedback onPress={()=>{getDeviceInfo();}} >
                        <SettingButtonText>단말기 정보 가져오기</SettingButtonText>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{deviceKeyTransfer();}}>
                        <SettingButtonText>키교환하기(오류시 시도)</SettingButtonText>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{checkDeviceIntegrity();}}>
                        <SettingButtonText>장치 무결성 점검</SettingButtonText>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{getCardInfo();}} >
                        <SettingButtonText>카드정보 가져오기</SettingButtonText>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{getDeviceSetting();}} >
                        <SettingButtonText>장치 설정</SettingButtonText>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{getDeviceDefaultSetting();}} >
                        <SettingButtonText>장치 기본 설정</SettingButtonText>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{testPayment();}} >
                        <SettingButtonText>테스트 결제</SettingButtonText>
                    </TouchableWithoutFeedback>
                </SettingButtonWrapper>
            </SettingWrapper>
        </>
    )
}
export default SettingPopup;