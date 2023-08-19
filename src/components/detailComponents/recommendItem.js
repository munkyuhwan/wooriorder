import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RecommendItemDim, RecommendItemImage, RecommendItemImageWrapper, RecommendItemInfoChecked, RecommendItemInfoPrice, RecommendItemInfoTitle, RecommendItemInfoWrapper, RecommendItemWrapper } from '../../styles/main/detailStyle';

const RecommendItem = (props) => {
    const recommendData = props?.recommendData;
    const menuData = props?.menuData;

    
    return(
        <>
            <TouchableWithoutFeedback>
                <RecommendItemWrapper>
                    <RecommendItemImageWrapper>
                        <RecommendItemImage  source={{uri:`${recommendData?.imgUrl}`}}/>
                        <RecommendItemDim/>
                        <RecommendItemInfoChecked source={require("../../../assets/icons/check_red.png")}/>
                    </RecommendItemImageWrapper>
                    <RecommendItemInfoWrapper>
                        <RecommendItemInfoTitle>{recommendData?.name}</RecommendItemInfoTitle>
                        <RecommendItemInfoPrice>{Number(recommendData?.price).toLocaleString(undefined,{maximumFractionDigits:0})} 원</RecommendItemInfoPrice>
                    </RecommendItemInfoWrapper>
                </RecommendItemWrapper>
            </TouchableWithoutFeedback>

        </>
    )
}
export default RecommendItem;