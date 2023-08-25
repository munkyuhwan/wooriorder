import React, { useState, useEffect } from 'react'
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { colorDarkGrey, colorGrey, colorRed, colorWhite } from '../../assets/colors/color';
import { TransparentPopupBottomButtonIcon, TransparentPopupBottomButtonText, TransparentPopupBottomButtonWraper, TransparentPopupBottomInnerWrapper, TransparentPopupBottomWrapper, TransparentPopupTopWrapper, TransparentPopupWrapper, TransperentPopupMidWrapper, TransperentPopupTopSubTitle, TransperentPopupTopTitle } from '../../styles/common/popup';
import { LANGUAGE } from '../../resources/strings';

const CallServerPopup = () => {
    const dispatch = useDispatch();
    const {language} = useSelector(state=>state.languages);
    console.log("LANGUAGE[language].serverPopup.callBtnText:",LANGUAGE[language].serverPopup.callBtnText)
    return(
        <TransparentPopupWrapper>
            <TransparentPopupTopWrapper>
                <TransperentPopupTopTitle>{LANGUAGE[language].serverPopup.callServer}</TransperentPopupTopTitle>
                <TransperentPopupTopSubTitle>{LANGUAGE[language].serverPopup.text}</TransperentPopupTopSubTitle>
            </TransparentPopupTopWrapper>     
            <TransperentPopupMidWrapper>
            </TransperentPopupMidWrapper>   
            <TransparentPopupBottomWrapper>
                <TransparentPopupBottomInnerWrapper>
                    <TransparentPopupBottomButtonWraper bgColor={colorRed} >
                        <TransparentPopupBottomButtonText>{LANGUAGE[language].serverPopup.callBtnText}</TransparentPopupBottomButtonText>
                        <TransparentPopupBottomButtonIcon source={require("assets/icons/bell_trans.png")} />
                    </TransparentPopupBottomButtonWraper>
                    <TransparentPopupBottomButtonWraper bgColor={colorDarkGrey} >
                        <TransparentPopupBottomButtonText>{LANGUAGE[language].serverPopup.closeBtnText}</TransparentPopupBottomButtonText>
                        <TransparentPopupBottomButtonIcon source={require("assets/icons/cancel.png")} />
                    </TransparentPopupBottomButtonWraper>
                </TransparentPopupBottomInnerWrapper>
            </TransparentPopupBottomWrapper>    
        </TransparentPopupWrapper>
    )
}
export default CallServerPopup;