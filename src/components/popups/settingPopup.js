import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DetailSettingWrapper, SelectCancelText, SelectCancelWrapper, SelectWrapper, SettingButtonText, SettingButtonWrapper, SettingConfirmBtn, SettingConfirmBtnText, SettingConfirmBtnWrapper, SettingScrollView, SettingWrapper, TableColumnInput, TableColumnTitle, TableColumnWrapper } from '../../styles/common/settingStyle';
import { Alert, DeviceEventEmitter, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { indicateAvailableDeviceInfo, startSmartroCheckIntegrity, startSmartroGetDeviceInfo, startSmartroGetDeviceSetting, startSmartroKeyTransfer, startSmartroReadCardInfo, startSmartroRequestPayment, startSmartroSetDeviceDefaultSetting } from '../../utils/smartro';
import CodePush from 'react-native-code-push';
import PopupIndicator from '../common/popupIndicator';
import { IndicatorWrapper, PopupIndicatorText, PopupIndicatorWrapper, PopupSpinner } from '../../styles/common/popupIndicatorStyle';
import { PopupCloseButton, PopupCloseButtonWrapper } from '../../styles/common/popup';
import { openFullSizePopup } from '../../utils/common';
import { Picker } from '@react-native-picker/picker';
import { clearTableInfo, initTableInfo, setTableInfo } from '../../store/tableInfo';

const SettingPopup = () =>{

    const dispatch = useDispatch();
    const pickerRef = useRef();

    const [spinnerText, setSpinnerText] = React.useState("")
    const {tableList,tableInfo} = useSelector(state=>state.tableInfo);

    const [isTableSettingShow, setTableSettingShow] = useState(false);
    const [selectedTable, setSelectedTable] = useState(tableInfo);

    const getIndicateAvailableDeviceInfo = () =>{
        indicateAvailableDeviceInfo()
        .then((result)=>{
            const jsonResult=JSON.parse(result);
            console.log("jsonResult: ",jsonResult);
            displayOnAlert("사용가능 디바이스 정보",jsonResult);
        })
        .catch((error)=>{
            console.log("error: ",error)
        })
    }
 
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
            CodePush
            const update = await CodePush.checkForUpdate("H96RQX5_1TsiwFdS8_joFNGSm2V24ncuV-1Ch");
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
    function releaseTable() {
        dispatch(clearTableInfo());
    }
    const Dropdown = () => {

        return (
            <SelectWrapper>
                <Picker
                    ref={pickerRef}
                    key={"tablePicker"}
                    mode='dialog'
                    onValueChange = {(itemValue, itemIndex) => {
                        dispatch(setTableInfo(itemValue))
                    }}
                    selectedValue={tableInfo}
                    style = {{
                        width: 200,
                        height: 50,
                        flex:1
                    }}>
                        <Picker.Item key={"none"} label = {"미선택"} value ={{}} />
                    {tableList.map(el=>{
                        return(
                            <Picker.Item key={el.FLR_NAME+"_"+el.TBL_NAME}  label = {el.FLR_NAME+"층 "+el.TBL_NAME+"테이블"} value ={el} />
                        )
                    })
                    }
                </Picker>
                <TouchableWithoutFeedback onPress={()=>{releaseTable();}}>
                    <SelectCancelWrapper>
                        <SelectCancelText>해제</SelectCancelText>
                    </SelectCancelWrapper>
                </TouchableWithoutFeedback>
            </SelectWrapper>
        );
    };
 
    return (
        <>
            <SettingWrapper>
                {/* <TouchableWithoutFeedback onPress={()=>{ openFullSizePopup(dispatch,{innerFullView:"", isFullPopupVisible:false}); }}>
                        <PopupCloseButtonWrapper>
                            <PopupCloseButton source={require('assets/icons/close_red.png')}/>
                        </PopupCloseButtonWrapper>
                </TouchableWithoutFeedback> */}
                <SettingScrollView>
                    <SettingButtonWrapper>
                        <TouchableWithoutFeedback onPress={()=>{ setTableSettingShow(!isTableSettingShow) }} >
                            <SettingButtonText>테이블 세팅</SettingButtonText>
                        </TouchableWithoutFeedback> 
                        {isTableSettingShow &&
                            <Dropdown/>
                        }
                        <TouchableWithoutFeedback onPress={()=>{getIndicateAvailableDeviceInfo();}} >
                            <SettingButtonText>가능 단말기 가져오기</SettingButtonText>
                        </TouchableWithoutFeedback>
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
                </SettingScrollView>
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