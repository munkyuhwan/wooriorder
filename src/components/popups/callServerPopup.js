import React, { useState, useEffect } from 'react'
import { Text, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { colorDarkGrey, colorGrey, colorRed, colorWhite } from '../../assets/colors/color';
import { TransparentPopupBottomButtonIcon, TransparentPopupBottomButtonText, TransparentPopupBottomButtonWraper, TransparentPopupBottomInnerWrapper, TransparentPopupBottomWrapper, TransparentPopupTopWrapper, TransparentPopupWrapper, TransperentPopupMidWrapper, TransperentPopupTopSubTitle, TransperentPopupTopTitle } from '../../styles/common/popup';
import { LANGUAGE } from '../../resources/strings';
import SelectItemComponent from '../common/selectItemComponent';
import { getCallServerItems, sendServiceToPos, sendToPos } from '../../store/callServer';
import { openFullSizePopup, openTransperentPopup } from '../../utils/common';

const CallServerPopup = () => {
    const dispatch = useDispatch();
    const {language} = useSelector(state=>state.languages);

    const {callServerItems} = useSelector(state=>state.callServer);
    const {isFullPopupVisible, innerFullView} = useSelector(state=>state.popup);
    const [selectedService, setSelectedService] = useState();

    useEffect(()=>{
        if(isFullPopupVisible==true && innerFullView=="CallServer") {
            //dispatch(getCallServerItems());
        }
    },[isFullPopupVisible, innerFullView])

    useEffect(()=>{
    },[callServerItems])

    const onServiceSelected = (indexArray) =>{
        setSelectedService(indexArray);
    }
    const callServer = () =>{
        dispatch(sendServiceToPos(selectedService));
    } 

    return(
        <TransparentPopupWrapper>
            <TransparentPopupTopWrapper>
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