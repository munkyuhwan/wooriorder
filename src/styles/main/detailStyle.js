import React, { useState } from 'react'
import styled, {css} from 'styled-components/native';
import { colorBlack, colorRed, colorWhite, mainTheme } from '../../../assets/colors/color';
import { RADIUS } from '../values';

export const DetailWrapper=styled.View`
    width:100%;
    height:100%;
    paddingRight:64px;
    paddingBottom:38px;
    backgroundColor:${mainTheme};
`
export const DetailWhiteWrapper = styled.View`
    width:100%;
    height:100%;
    borderRadius:${RADIUS};
    backgroundColor:${colorWhite};
    paddingTop:31px;
    paddingBottom:31px;
    paddingRight:36px;
    paddingLeft:36px;
`

export const DetailInfoWrapper = styled.View`
    width:100%;
    height:166px;
    flexDirection:row;
    backgroundColor:transparent;
`
// 상단 
export const DetailItemInfoWrapper = styled.View`
    flexDirection:column;
    paddingLeft:29px;
    paddingTop:12px;
`
export const DetailItemInfoImage = styled.Image`
    width:262px;
    height:166px;
    borderRadius:${RADIUS};
`
export const DetailItemInfoTitleWrapper = styled.View`
    flexDirection:row;
`
export const DetailItemInfoTitle = styled.Text`
    fontSize:28px;
    fontWeight:bold;
    marginRight:11px;
    color:${colorBlack}
`
export const DetailItemInfoTitleEtc = styled.Image`
    width:31px;
    height:21px;
    marginRight:11px;
    resizeMode:contain;

`
export const DetailItemInfoSource = styled.Text`
    fontSize:14px;
    color:${colorRed};
`
export const DetailPriceMoreWrapper = styled.View`
    flexDirection:column;
    flex:1;
`
export const DetailItemInfoPriceWrapper = styled.View`
    flexDirection:row;
    flex:1;
`
export const DetailItemInfoPrice = styled.Text`
    fontSize:25px;
    color:${colorRed};
    ${(props)=>props.isBold?"fontWeight:bold;":""}
    marginTop:auto;
    marginBottom:auto;
`
export const DetailItemInfoMore = styled.Text`
    fontSize:12px;
    color:${colorBlack};
    flex:1
`

// 옵션 & 추천메뉴
export const OptRecommendWrapper = styled.View`
    flex:1;
    backgroundColor:blue;
    flexDirection:column;
`
export const OptListWrapper = styled.View`
    flexDirection:column;
`
export const OptTitleText = styled.Text`
    fontSize:17px;   
    color:${colorBlack};
    fontWeight:bold;
`
export const OptList = styled.FlatList`
    width:100%;
    backgroundColor:red;
`
// 하단 버튼
export const BottomButtonWrapper = styled.View`
    flexDirection:row;
    justifyContent:center;
`
export const BottomButton = styled.View`
    width:174px;
    height:49px;
    backgroundColor:${(props)=>props.backgroundColor};
    flexDirection:row;
    justifyContent:center;
    paddingLeft:27px;
    paddingRight:27px;
    marginLeft:8px;
    marginRight:8px;
    borderRadius:${RADIUS};
`
export const BottomButtonText = styled.Text`
    fontSize:18px;
    color:${colorWhite};
    fontWeight:bold;
    marginTop:auto;
    marginBottom:auto;
    flex:1;
`
export const BottomButtonIcon = styled.Image`
    width:18px;
    height:18px;
    resizeMode:contain;
    marginTop:auto;
    marginBottom:auto;
`


