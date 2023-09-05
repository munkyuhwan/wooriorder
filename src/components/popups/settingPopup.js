import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SettingButtonText, SettingButtonWrapper, SettingWrapper } from '../../styles/common/settingStyle';
import { Alert, DeviceEventEmitter, TouchableWithoutFeedback } from 'react-native';
import { startSmartroCheckIntegrity, startSmartroGetDeviceInfo, startSmartroGetDeviceSetting, startSmartroKeyTransfer, startSmartroReadCardInfo, startSmartroRequestPayment, startSmartroSetDeviceDefaultSetting } from '../../utils/smartro';
import CodePush from 'react-native-code-push';
import PopupIndicator from '../common/popupIndicator';
import { IndicatorWrapper, PopupIndicatorText, PopupIndicatorWrapper, PopupSpinner } from '../../styles/common/popupIndicatorStyle';

const SettingPopup = () =>{
    const [spinnerText, setSpinnerText] = React.useState("")

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

    const checkUpdate =  async() =>{
            
            const update = await CodePush.checkForUpdate();
            console.log("update: ",update);
            if(update) {
                /* Alert.alert(
                    "업데이트",
                    "앱 업데이트가 있습니다.",
                    [{
                        text:'확인',
                    }]
                ) */
                update
                .download((progress)=>{
                    setSpinnerText("업데이트 중...",progress,"%");
                })
                .then((newPackage)=>{
                    setSpinnerText("");

                    newPackage
                    .install(CodePush.InstallMode.IMMEDIATE)
                    .then(()=>{CodePush.restartApp()});
                })
            }else {
                Alert.alert(
                    "업데이트",
                    "앱 업데이트가 없습니다.",
                    [{
                        text:'확인',
                    }]
                )
            } 
        
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
                    <TouchableWithoutFeedback onPress={()=>{}} >
                        <SettingButtonText>메뉴 업데이트</SettingButtonText>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{checkUpdate();}} >
                        <SettingButtonText>앱 업데이트</SettingButtonText>
                    </TouchableWithoutFeedback>
                </SettingButtonWrapper>
                
            </SettingWrapper>
            {(spinnerText!="")&&
                <PopupIndicatorWrapper style={{right:0, position:'absolute', width:'104%', height:'104%'}}>
                    <IndicatorWrapper>
                        <PopupSpinner size={'large'}/>
                        <PopupIndicatorText>{spinnerText}</PopupIndicatorText>
                    </IndicatorWrapper>
                </PopupIndicatorWrapper>
            }
        </>
    )
}
export default SettingPopup;