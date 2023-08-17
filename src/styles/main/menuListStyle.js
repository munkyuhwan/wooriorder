import React, { useState } from 'react'
import styled, {css} from 'styled-components/native';
import { RADIUS } from '../values';
import { colorWhite } from '../../../assets/colors/color';

export const MenuListWrapper = styled.View`
    width:100%;
    height:100%;
    paddingTop:31px;
    paddingLeft:31px;
    paddingRight:36px;
    paddingBottom:80px;
`;


// menu item style
export const MenuItemTopWrapper = styled.View`
    flex:1;
`
export const MenuItemWrapper = styled.View`
    width:32.5%;    
`
export const MenuItemImageWrapper = styled.View`
    width:100%;
    height:100%;    
    position:absolute;
    paddingTop:15px;
    paddingBottom:15px;
    paddingLeft:12px;
    paddingRight:12px;
`
export const MenuItemImage = styled.Image`
    width:100%;
    height:183px;
    resizeMode:background;
    borderRadius:${RADIUS}
`
export const MenuItemButtonWrapper = styled.View`
    flexDirection:row;
`
export const MenuItemButtonInnerWrapper = styled.View`
    width:100%;
    flex:1;
    flexDirection: row;
    justifyContent: ${(props)=>{props.justifyContent}};
`
export const MenuItemButton = styled.Image`
    width:36px;
    height:36px;
    resizeMode:contain;
`
export const MenuItemHotnessWrapper = styled.View`
    flexDirection:row;
    flex:1;
`
export const MenuItemHotness = styled.Image`
    marginRight:4px;
    width:31px;
    height:21px;
`
export const MenuItemBottomWRapper = styled.View`
    width:100%; 
    height:100px;
    flex:1;
    flexDirection:column;  
    paddingTop:19px;
    alignItems:center;
`
export const MenuItemName = styled.Text`
    fontSize:21px;
    color:${colorWhite};
    fontWeight:bold;
`
export const MenuItemPrice = styled.Text`
    fontSize:17px;
    color:${colorWhite};
 
`

