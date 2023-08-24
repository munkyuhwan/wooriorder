import React, { useState } from 'react'
import styled, {css} from 'styled-components/native';
import { colorBlack, colorWhite } from '../../assets/colors/color';

// 전체
export const LanguageSelectWrapper = styled.View`
    width:415px;
    height:290px;
    paddingRight:17px;
    flexDirection:column;
`;

// 상단 타이틀
export const LanguageSelectTitleWrapper = styled.View`
    paddingTop:63px;
`
export const LanguageSelectTitleText = styled.Text`
    textAlign:center;
    fontSize:16px;
    fontWeight:bold;
    color:${colorBlack};
`
export const LanguageSelectSubtitleText = styled.Text`
    textAlign:center;
    fontSize:11px;
    color:${colorBlack};
`
// 언어선택 
export const LanguageWrapper = styled.View`
    width:100%;
    flexDirection:row;
    justifyContent:space-between;
    paddingTop:35px;
    paddingLeft:44px;
    paddingRight:44px;
`
// 아이콘
export const LanguageIconWrapper = styled.View`
    width:65px;
    height:65px;

`
export const LanguageIconImage = styled.Image`
    width:100%;
    height:100%;
    resizeMode:contain;
`
//선택된 언어
export const LanguageSelectedWrapper = styled.View`
    width:65px;
    heiht:65px;
    position:absolute;
`
export const LanguageIconDim = styled.View`
    width:65px;
    height:65px;
    backgroundColor:rgba(0,0,0,0.7);
    position:absolute;
    borderRadius:100px;
`
export const LanguageIconChecked = styled.Image`
    width:18px;
    height:18px;
    right:0;
    position:absolute;
`
export const LanguageSelectedText = styled.Text`
    width:65px;
    height:65px;
    fontSize:14px;
    color:${colorWhite};
    position:absolute;
    textAlign:center;
    marginTop:25px;
`