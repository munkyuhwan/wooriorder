import React, { useState } from 'react'
import styled, {css} from 'styled-components/native';
import { colorWhite } from '../../../assets/colors/color';
import { RADIUS } from '../values';

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
