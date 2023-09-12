import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { OptItemDim, OptItemImage, OptItemInfoChecked, OptItemInfoPrice, OptItemInfoTitle, OptItemInfoWrapper, OptItemWrapper } from '../../styles/main/detailStyle';


const OptItem = (props)=>{
    const optionData = props?.optionData;
    const menuData = props?.menuData;
    //console.log("isSelected: ",props?.isSelected);    
    return(
        <>
            <TouchableWithoutFeedback onPress={props.onPress} >
                <OptItemWrapper>
                    <OptItemImage  source={{uri:`${optionData?.imgUrl}`}}/>
                    <OptItemDim isSelected={props?.isSelected}/>
                    <OptItemInfoWrapper>
                        <OptItemInfoTitle>{optionData?.name}</OptItemInfoTitle>
                        <OptItemInfoPrice>+{Number(optionData?.price).toLocaleString(undefined,{maximumFractionDigits:0})}</OptItemInfoPrice>
                        <OptItemInfoChecked isSelected={props?.isSelected} source={require("../../assets/icons/check_red.png")}/>
                    </OptItemInfoWrapper>
                </OptItemWrapper>
            </TouchableWithoutFeedback>

        </>
    )
}
export default OptItem