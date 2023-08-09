import React, { useState } from 'react'
import styled, {css} from 'styled-components/native';
import { RADIUS, RADIUS_DOUBLE } from '../values';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { colorGrey, colorRed, colorWhite, mainTheme, textColorWhite } from '../../../assets/colors/color';

export const CartViewWrapper = styled(Animated.View)`
    backgroundColor:#ffffff; 
    height:100%; 
    width:314px;
    paddingTop:94px;
    position:absolute;
    zIndex:99;
    right:0;
    flexDirection:column;
`

export const CartFlatList = styled.FlatList`
    backgroundColor:${colorWhite};
`
export const OrderWrapper = styled.View`
    backgroundColor:${colorRed};
    width:100%;
    height:173px;
`
export const Handle = styled.View`
    backgroundColor:${colorWhite};
    height:81px;
    width:28px;
    marginTop:320px;
    position:absolute;
    left:-28px;
    zIndex:999999;
    borderTopLeftRadius:23px;
    borderBottomLeftRadius:22px;
    alignIten:center;
    justfyContent:center;
    paddingLeft:8px;
`
export const ArrowImage = styled.Image`
    resizeMode:contain;
    width:15px;
    flex:1;
`

// cart list item
export const CartItemWrapper = styled.View`
    width:100%;
    paddingBottom:12px;
    paddingTop:12px; 
    paddingLeft:23px;
    paddingRight:23px;
    borderBottomWidth:1px;
    borderColor:${colorGrey};
    flexDirection:row;
`
// cart 이미지 포장하기 
export const CartItemImageTogoWrapper = styled.View`
    flexDirection:column;
`
export const CartItemImage = styled.Image`
    width:100px;
    height:62px;
    backgroundColor:brown;
    borderRadius:${RADIUS};
`
export const CartItemTogoWrapper = styled.View`
    width:100px;
    height: 36px;
    backgroundColor:${mainTheme};
    marginTop:12px;
    alignItem:center;
    justifyContent:center;
    flexDirection:row;
    borderRadius:${RADIUS};
`
export const CartItemTogoText = styled.Text`
    color:${textColorWhite};
    textAlign:center;
    fontSize:13px;
    marginTop:auto;
    marginBottom:auto;
`
export const CartItemTogoIcon = styled.Image`
    width:13px;
    height:13px;
    resizeMode:contain;
    marginLeft:6px;
    marginTop:auto;
    marginBottom:auto;
`
// cart 이름, 가격, 수량
export const CartItemTitlePriceWrapper = styled.View`
    width:145px;
    paddingLeft:16px;
    paddingRiight:2px;
    paddingTop:2px;
    flexDirection:column;
`
export const CartItemTitle = styled.Text`
    fontSize:15px;
    fontWeight:bold;
    color:${mainTheme};
    flex:1;
`
export const CartItemPrice = styled.Text`
    fontSize:13px;
    fontWeight:normal;
    color:${colorRed};
    flex:1;
`
// 수량 조절 
export const CartItemAmtWrapper = styled.View`
    width:128px;
    height: 36px;
    backgroundColor:${colorGrey};
    borderRadius:${RADIUS};
    flexDirection:row;
    padding:5px;
`
export const CartItemAmtController = styled.View`
    width:25px;
    height:25px;
    backgroundColor:${colorWhite};
    borderRadius:${RADIUS};
    marginTop:auto;
    marginBottom:auto;
    flexDirection:row;
`
export const CartItemAmtControllerText = styled.Text`
    fontSize:45px;
    fontWeight:normal;
    lineHeight:40px;
    textAlign:center;
`
    
 
export const CartItemAmtText = styled.Text`
    fontSize:14px;
    fontWeight:bold;

`
// 취소 버튼
export const CartItemCancelWrapper = styled.View`
    width:100%;
    height:100%;
`
export const CartItemCancelBtn = styled(TouchableWithoutFeedback)`

`