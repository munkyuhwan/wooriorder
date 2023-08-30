import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SettingButtonText, SettingButtonWrapper, SettingWrapper } from '../../styles/common/settingStyle';
import { Alert, TouchableWithoutFeedback } from 'react-native';
import { startSmartroCheckIntegrity, startSmartroGetDeviceInfo, startSmartroKeyTransfer } from '../../utils/smartro';

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
                </SettingButtonWrapper>
            </SettingWrapper>
        </>
    )
}
export default SettingPopup;