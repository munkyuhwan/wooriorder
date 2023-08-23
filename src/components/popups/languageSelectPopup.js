import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LanguageSelectSubtitleText, LanguageSelectTitleText, LanguageSelectTitleWrapper, LanguageSelectWrapper } from '../../styles/popup/languageSelectPopup';
import { LANGUAGE } from '../../resources/strings';

const LanguageSelectPopup = () => {
    const {language} = useSelector(state=>state.languages);
    return(
        <>
            <LanguageSelectWrapper>
                <LanguageSelectTitleWrapper>
                    <LanguageSelectTitleText>{LANGUAGE[language].languageSelectView.title}</LanguageSelectTitleText>
                    <LanguageSelectSubtitleText>{LANGUAGE[language].languageSelectView.subTitle}</LanguageSelectSubtitleText>
                </LanguageSelectTitleWrapper>
            </LanguageSelectWrapper>
        </>
    )
}
export default LanguageSelectPopup;