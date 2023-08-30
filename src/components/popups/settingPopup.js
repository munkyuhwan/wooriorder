import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SettingButtonText, SettingButtonWrapper, SettingWrapper } from '../../styles/common/settingStyle';
import { Alert, TouchableWithoutFeedback } from 'react-native';
import { startSmartroGetDeviceInfo } from '../../utils/smartro';

const SettingPopup = () =>{
    
    const getDeviceInfo = () =>{
        startSmartroGetDeviceInfo()
        .then((result)=>{
            console.log("success result: ", result)
            const jsonResult=JSON.parse(result);
            
            Alert.alert(
                "단말기 정보",
                `
                시리얼번호: ${jsonResult["additional-device-serial"]}\n
                외부이름: ${jsonResult["external-name"]}\n
                외부시리얼: ${jsonResult["external-serial"]}\n
                기기명: ${jsonResult["device-name"]}\n
                동글명: ${jsonResult["dongle-name"]}\n
                deviceAuthInfo: ${jsonResult["device-auth-info"]}\n
                `,
                [{
                    text:'확인',
                }]
            )
        })
        .catch((error)=>{
            console.log("error: ",error)
        })
    }

    return (
        <>
            <SettingWrapper>
                <SettingButtonWrapper>
                    <TouchableWithoutFeedback onPress={()=>{getDeviceInfo();}} >
                        <SettingButtonText>단말기 정보 가져오기</SettingButtonText>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <SettingButtonText>키교환하기(오류시 시도)</SettingButtonText>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <SettingButtonText>장치 무결성 점검</SettingButtonText>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <SettingButtonText>금전함 열기(단말기)</SettingButtonText>
                    </TouchableWithoutFeedback>
                </SettingButtonWrapper>
            </SettingWrapper>
        </>
    )
}
export default SettingPopup;