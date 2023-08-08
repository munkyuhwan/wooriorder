import React, { useState } from 'react'
import styled, {css} from 'styled-components/native';
import { RADIUS } from '../values';
import { sideMenuColor } from '../../../assets/colors/color';

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
export const SideMenuItemWrapper = styled.View`
    display:flex;
    width:180px;
`
// 사에드 메뉴 아이템 터쳐블
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
