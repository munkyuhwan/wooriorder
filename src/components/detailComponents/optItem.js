import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { OptItemDim, OptItemImage, OptItemInfoChecked, OptItemInfoPrice, OptItemInfoTitle, OptItemInfoWrapper, OptItemWrapper } from '../../styles/main/detailStyle';


const OptItem = (props)=>{
    const optionData = props?.optionData;
    const menuData = props?.menuData;
    
    const [selectedOption, setSelectedOption] = useState([]);
    const [recommendMenu, setRecommendMenu] = useState([]);

    const onOptionSelect = ()=>{

    }
    return(
        <>
            <TouchableWithoutFeedback>
                <OptItemWrapper>
                    <OptItemImage  source={{uri:`${optionData?.imgUrl}`}}/>
                    <OptItemDim/>
                    <OptItemInfoWrapper>
                        <OptItemInfoTitle>{optionData?.name}</OptItemInfoTitle>
                        <OptItemInfoPrice>+{Number(optionData?.price).toLocaleString(undefined,{maximumFractionDigits:0})}</OptItemInfoPrice>
                        <OptItemInfoChecked source={require("../../../assets/icons/check_red.png")}/>
                    </OptItemInfoWrapper>
                </OptItemWrapper>
            </TouchableWithoutFeedback>

        </>
    )
}
export default OptItem