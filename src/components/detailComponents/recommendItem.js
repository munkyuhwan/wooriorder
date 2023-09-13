import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RecommendItemDim, RecommendItemImage, RecommendItemImageWrapper, RecommendItemInfoChecked, RecommendItemInfoPrice, RecommendItemInfoTitle, RecommendItemInfoWrapper, RecommendItemWrapper } from '../../styles/main/detailStyle';
import { MENU_DATA } from '../../resources/menuData';

const RecommendItem = (props) => {
    const recommendData = MENU_DATA.menuAll[props?.recommendData];
    const menuData = props?.menuData;
    
    return(
        <>
            <TouchableWithoutFeedback onPress={props?.onPress}>
                <RecommendItemWrapper>
                    <RecommendItemImageWrapper>
                        <RecommendItemImage  source={{uri:`${recommendData?.imgUrl}`}}/>
                        <RecommendItemDim isSelected={props?.isSelected}/>
                        {props?.isSelected &&
                            <RecommendItemInfoChecked isSelected={props?.isSelected} source={require("../../assets/icons/check_red.png")}/>
                        }
                    </RecommendItemImageWrapper>
                    <RecommendItemInfoWrapper>
                        <RecommendItemInfoTitle>{recommendData?.title}</RecommendItemInfoTitle>
                        <RecommendItemInfoPrice>{Number(recommendData?.price).toLocaleString(undefined,{maximumFractionDigits:0})} 원</RecommendItemInfoPrice>
                    </RecommendItemInfoWrapper>
                </RecommendItemWrapper>
            </TouchableWithoutFeedback>

        </>
    )
}
export default RecommendItem;