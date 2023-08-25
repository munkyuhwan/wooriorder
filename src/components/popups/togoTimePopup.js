import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TogoTimePickerWrapper, TogoWrapper } from '../../styles/popup/togoPopupStype';
import { LANGUAGE, LANGUAGE_LIST } from '../../resources/strings';
import { PopupBottomButtonBlack, PopupBottomButtonText, PopupBottomButtonWrapper, PopupSubtitleText, PopupTitleText, PopupTitleWrapper } from '../../styles/common/coreStyle';
import DatePicker from 'react-native-date-picker'
import { TouchableWithoutFeedback } from 'react-native';
import { setPopupVisibility } from '../../store/popup';

const TogoPopup = () =>{
    const dispatch = useDispatch();
    const {language} = useSelector(state=>state.languages);
    return(
        <>
            <TogoWrapper>
                <PopupTitleWrapper>
                    <PopupTitleText>{LANGUAGE[language].togoView.title}</PopupTitleText>
                </PopupTitleWrapper>
                <TogoTimePickerWrapper>
                    <DatePicker mode={"time"} date={new Date()} androidVariant='nativeAndroid' is24hourSource="locale" onDateChange={(time)=>{console.log("time:",time)}} />
                </TogoTimePickerWrapper>
            </TogoWrapper>
        </>
    )
}
export default TogoPopup;