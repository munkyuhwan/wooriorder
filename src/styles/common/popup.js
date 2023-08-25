import React, { useState } from 'react'
import styled, {css} from 'styled-components/native';
import { colorRed, colorWhite } from '../../assets/colors/color';
import { RADIUS, RADIUS_SMALL } from '../values';

export const PopupWrapper = styled.View`
    width:100%;
    height:100%;
    position:absolute;
    backgroundColor:rgba(0,0,0,0.7);
`
export const PopupContentWrapper = styled.View`
    width:415px;
    paddingTop:9px;
    paddingRight:7px;
    paddingLeft:7px;
    paddingBottom:7px;
    backgroundColor:${colorWhite};
    margin:auto;
    borderRadius:${RADIUS};   
`
export const PopupCloseButtonWrapper = styled.View`
    width:100%;
    alignItems:flex-end;
`
export const PopupCloseButton = styled.Image`
    width:26px;
    height:26px;
    resizeMode:contain;
`

// 투명배경 팝업
export const TransparentPopupWrapper = styled.View`
    flex:1;
    marginTop:58px;
    marginRight:96px;
    marginLeft:96px;
    marginBottom:64px;
`
// 투명배경 상단 텍스트
export const TransparentPopupTopWrapper = styled.View`

`
export const TransperentPopupTopTitle = styled.Text`
    fontSize:30px;
    color:${colorRed};
    fontWeight:bold;
`
export const TransperentPopupTopSubTitle = styled.Text`
    paddingTop:40px;
    color:${colorWhite};
    lineHeight:31px;
`
// 투명배경 팝업 중간 뷰
export const TransperentPopupMidWrapper = styled.View`
    backgroundColor:blue;
    flex:1;
`   
// 하단 버튼 선택
export const TransparentPopupBottomWrapper = styled.View`
    width:100%;
    flexDirection:column;
    justifyContents:center;
    alignItems:center;
`
export const TransparentPopupBottomInnerWrapper = styled.View`
    flexDirection:row;
    justifyContents:space-between;
`
export const TransparentPopupBottomButtonWraper  = styled.View`
    backgroundColor:${(props)=>props.bgColor};
    flexDirection:row;
    alignItems:center;
    paddingTop:16px;
    paddingBottom:14px;
    paddingRight:34px;
    paddingLeft:38px;
    borderRadius:${RADIUS_SMALL};
    marginLeft:10px;
    marginRight:10px;
`
export const TransparentPopupBottomButtonText = styled.Text`
    color:${colorWhite};
    fontSize:18px;
    paddingRight:12px;
`
export const TransparentPopupBottomButtonIcon = styled.Image`
    width:15px;
    height:15px;
    resizeMode:contain;
`
