import React, { useState } from 'react'
import styled, {css} from 'styled-components/native';
import { colorWhite, mainTheme } from '../../../assets/colors/color';
import { RADIUS } from '../values';

export const DetailWrapper=styled.View`
    width:100%;
    height:100%;
    paddingRight:64px;
    paddingBottom:38px;
    backgroundColor:${mainTheme};
`

export const DetailInfoWrapper = styled.View`
    width:100%;
    height:100%;
    backgroundColor:${colorWhite};
    borderRadius:${RADIUS};
`
// 상단 
export const DetailItemInfoWrapper = styled.View`

`
export const DetailItemInfoImage = styled.Image`

`
export const DetailItemInfoTitleWrapper = styled.View`

`
export const DetailItemInfoTitle = styled.Text`

`
export const DetailItemInfoTitleEtc = styled.Image`

`
export const DetailItemInfoSource = styled.Text`

`
export const DetailItemInfoPrice = styled.Text`

`
export const DetailItemInfoMore = styled.Text`

`


