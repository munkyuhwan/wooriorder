import React, { useState, useEffect } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { colorDarkGrey, colorGrey, colorRed, colorWhite } from '../../assets/colors/color';
import { TransparentPopupBottomButtonIcon, TransparentPopupBottomButtonText, TransparentPopupBottomButtonWraper, TransparentPopupBottomInnerWrapper, TransparentPopupBottomWrapper, TransparentPopupTopWrapper, TransparentPopupWrapper, TransperentPopupMidWrapper, TransperentPopupTopSubTitle, TransperentPopupTopTitle } from '../../styles/common/popup';
import { LANGUAGE } from '../../resources/strings';
import SelectItemComponent from '../common/selectItemComponent';
import { getCallServerItems, getServiceList, sendToPos } from '../../store/callServer';
import { openFullSizePopup, openTransperentPopup } from '../../utils/common';
import { getAdminServices } from '../../utils/apis';

const CallServerPopup = () => {
    const dispatch = useDispatch();
    const {language} = useSelector(state=>state.languages);

    const {callServerItems} = useSelector(state=>state.callServer);
    const {isFullPopupVisible, innerFullView} = useSelector(state=>state.popup);
    const [selectedService, setSelectedService] = useState();

    // 세팅 터치
    const [settingTouch, setSettingTouch] = useState(0);
    const [isStartCounting, setIsStartCounting] = useState(true);

    useEffect(()=>{
        if(isFullPopupVisible==true && innerFullView=="CallServer") {
            //dispatch(getCallServerItems());
            dispatch(getServiceList());
        }
    },[isFullPopupVisible, innerFullView])

    useEffect(()=>{
        console.log("callServerItems : ",callServerItems)
    },[callServerItems])

    const onServiceSelected = (indexArray) =>{
        setSelectedService(indexArray);
    }
    const callServer = () =>{
        // dispatch(sendServiceToPos(selectedService));
        // 직원 호출하기
        dispatch(postAdminSerivceList(selectedService));
        openFullSizePopup(dispatch, {innerView:"", isPopupVisible:false});
    } 
    let settingCount=null;
    let countTime = 5;
    const countDown = () =>{
        if(isStartCounting) {
            setIsStartCounting(false);
            settingCount = setInterval(() => {
                if(countTime>0) {
                    countTime = countTime-1;
                }else {
                    countTime = 5
                    clearInterval(settingCount);
                    settingCount=null;
                    setIsStartCounting(true);
                }
            }, 1000);
        }
    }
    const onSettingPress = () => {
        if(settingTouch<5) {
            setSettingTouch(settingTouch+1);
            if(countTime>0) {
                if(settingTouch>=4) {
                    clearInterval(settingCount);
                    settingCount=null;
                    setIsStartCounting(true);
                    setSettingTouch(0);
                    openFullSizePopup(dispatch,{innerFullView:"Setting", isFullPopupVisible:true});
                }
            }
        }else {
            setSettingTouch(0);
        }
    } 

    return(
        <TransparentPopupWrapper>
            <TransparentPopupTopWrapper>
                <TouchableWithoutFeedback onPress={()=>{ countDown(); onSettingPress();} } style={{position:'absolute',  top:0,left:0, zIndex:999999999}}>
                    <View style={{width:100, height:40, backgroundColor:'transparent'}} >
                        <Text style={{color:'transparent'}} >ddd</Text>    
                    </View>
                </TouchableWithoutFeedback>
                <TransperentPopupTopTitle>{LANGUAGE[language]?.serverPopup.callServer}</TransperentPopupTopTitle>
                <TransperentPopupTopSubTitle>{LANGUAGE[language]?.serverPopup.text}</TransperentPopupTopSubTitle>
            </TransparentPopupTopWrapper>     
            <TransperentPopupMidWrapper>
                
                <SelectItemComponent 
                    data={callServerItems}
                    numColumns={4}
                    onServiceSelected={onServiceSelected}
                />
                
            </TransperentPopupMidWrapper>   
            <TransparentPopupBottomWrapper>
                <TransparentPopupBottomInnerWrapper>
                    <TouchableWithoutFeedback onPress={callServer}>
                        <TransparentPopupBottomButtonWraper bgColor={colorRed} >
                            <TransparentPopupBottomButtonText>{LANGUAGE[language]?.serverPopup.callBtnText}</TransparentPopupBottomButtonText>
                            <TransparentPopupBottomButtonIcon source={require("assets/icons/bell_trans.png")} />
                        </TransparentPopupBottomButtonWraper>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{openFullSizePopup(dispatch, {innerView:"", isPopupVisible:false});}}>
                        <TransparentPopupBottomButtonWraper bgColor={colorDarkGrey} >
                            <TransparentPopupBottomButtonText>{LANGUAGE[language]?.serverPopup.closeBtnText}</TransparentPopupBottomButtonText>
                            <TransparentPopupBottomButtonIcon source={require("assets/icons/cancel.png")} />
                        </TransparentPopupBottomButtonWraper>
                    </TouchableWithoutFeedback>
                </TransparentPopupBottomInnerWrapper>
            </TransparentPopupBottomWrapper>   
        </TransparentPopupWrapper>
    )
}
export default CallServerPopup;