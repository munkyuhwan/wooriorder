import React, { useState } from 'react'
import styled, {css} from 'styled-components/native';
import { RADIUS } from '../values';
import { colorRed, colorWhite, sideMenuColor } from '../../../assets/colors/color';

export const SideMenuWrapper = styled.View`
    height:100%;
    width:180px;
    backgroundColor:${sideMenuColor};
    borderTopRightRadius:${RADIUS};
    borderBottomRightRadius:${RADIUS};
    zIndex:999;
`
export const LogoWrapper = styled.View`
    width:180px;
    displaty:flex;
    align-items: center;
    paddingTop:15px;
    paddingBottom:15px
`
export const LogoTop = styled.Image` 
    resizeMode:contain;
    height:58px;
    width:150px;
    backgroundColor:${sideMenuColor};
    borderTopRightRadius:${RADIUS};
`

// 사이드메뉴 뤱퍼
export const SideMenuScrollView = styled.ScrollView`
    width:190px;
    height:490px; 
`
export const SideMenuItemWrapper = styled.View`
    display:flex;
    width:180px;
`
// 사에드 메뉴 아이템 터쳐블
export const SideMenuItemOff = styled.View`
    backgroundColor:#404040;
    width:190px;
    marginLeft:-10;
    marginTop:5;
`
export const SideMenuItem = styled.View`
    backgroundColor:#404040;
    width:190px;
    borderTopRightRadius:${RADIUS};
    borderBottomRightRadius:${RADIUS};
`
export const SideMenuItemOn = styled.View`
    backgroundColor:#ed3810;
    width:105%;
    borderTopRightRadius:${RADIUS};
    borderBottomRightRadius:${RADIUS};
`
/// 사이드 메뉴 텍스트스타일
export const SideMenuText = styled.Text`
    paddingTop:20px;
    paddingBottom:20px;
    paddingRight:42px;
    paddingLeft:42px;
    fontSize:19px;
    fontWeight:bold;
    color: #ffffff;
`;

// language & call wrapper
export const SideBottomWrapper = styled.View`
    padding:7px;
`
export const SideBottomButton = styled.View`
    width:100%;
    height:61px;
    ${(props)=>{return (props.bg=="red"?"backgroundColor:"+colorRed:"")}};
    flexDirection:row;
    justyfyContent:center;
    textAlign:center;
    borderWidth:1px;
    borderColor:${(props)=>{return(props.borderColor)}};
    borderRadius:${RADIUS};
    marginTop:8px;
    paddingLeft:22px;
    paddingRight:22px;
`
export const SideBottomText = styled.Text`
    fontSize:21px;
    fontWeight:bold;
    color:${colorWhite};
    textAlign:center;
    margin:auto;
`
export const SideBottomIcon = styled.Image`
    width:24px;
    height:24px;
    resizeMode:contain;
    margin:auto;
`
