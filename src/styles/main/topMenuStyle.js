import React, { useState } from 'react'
import styled, {css} from 'styled-components/native';
import { RADIUS, RADIUS_DOUBLE } from '../values';
import { colorRed, tabBaseColor, textColorWhite } from '../../assets/colors/color';

export const TopMenuWrapper = styled.View`
    flexDirection:row;
    height: 80px;
    display: flex;
    justifyContent: flex-start;
    paddingLeft:30px;
    zIndex:99999;
`
export const CategoryWrapper = styled.View` 
    flexDirection:row;
    height: 80px;
    display: flex;
    justifyContent: flex-start;
`;
export const CategoryScrollView = styled.ScrollView`
    width:602px;
    flex:1;
    flowDirection:column;

`
export const CategoryDefault = styled.View`
    backgroundColor: ${tabBaseColor};
    width:142px;
    height:52px;
    marginRight:7px;
    justifyContent: flex-end;
    marginTop:33px;
    borderTopLeftRadius:${RADIUS_DOUBLE}px;
    borderTopRightRadius:${RADIUS_DOUBLE}px;
`
/// 탑 메뉴 텍스트스타일
export const TopMenuText = styled.Text`
    flex:1;
    textAlign:center;
    justifyContent:center;
    display:flex;
    alignItems:center;
    fontSize:15px;
    fontWeight:bold;
    paddingTop:17px;
    color: ${textColorWhite};
`;

// talbe name
export const TableName = styled.View`
    backgroundColor: ${colorRed};
    width:163px;
    height:80px;
    paddingTop:14px;
    paddingBottom:15px;
    borderBottomRightRadius:${RADIUS};
    borderBottomLeftRadius:${RADIUS};
    zIndex:99999;
    flexDirection:column;
    marginLeft:4px;
`
// talbe name smallTitle
export const TableNameSmall = styled.Text`
    flex:1;
    textAlign:center;
    justifyContent:center;
    display:flex;
    alignItems:center;
    fontSize:15px;
    fontWeight:bold;
    color: ${textColorWhite};
`
// talbe name bigTitle
export const TableNameBig = styled.Text`
    textAlign:center;
    justifyContent:center;
    display:flex;
    alignItems:center;
    fontSize:29px;
    fontWeight:bold;
    color: ${textColorWhite};
`

// iconWRapper
export const IconWrapper = styled.View`
    flex:1;
    flexDirection:row;
    justifyContent:center;
    display:flex;
    alignItems:center;
    paddingTop:33px;
    zIndex:99999;

`
export const TouchIcon = styled.Image`
    resizeMode:contain;
    width:47px;
    height:47px;
    marginLeft:5px;
    marginRight:5px;
    zIndex:99999;
`