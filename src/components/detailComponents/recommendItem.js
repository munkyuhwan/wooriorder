import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RecommendItemDim, RecommendItemImage, RecommendItemImageWrapper, RecommendItemInfoChecked, RecommendItemInfoPrice, RecommendItemInfoTitle, RecommendItemInfoWrapper, RecommendItemWrapper } from '../../styles/main/detailStyle';
import { MENU_DATA } from '../../resources/menuData';

const RecommendItem = (props) => {
    const recommendData = MENU_DATA.menuAll[props?.recommendData];
    const menuData = props?.menuData;
    const {menuExtra} = useSelector(state=>state.menuExtra);
    // 메뉴 추가정보 찾기
    //console.log(menuExtra); 
    const itemExtra = menuExtra.filter(el=>el.pos_code == (props?.recommendData));
    return(
        <>
            <TouchableWithoutFeedback onPress={props?.onPress}>
                <RecommendItemWrapper>
                    <RecommendItemImageWrapper>
                        <RecommendItemImage  source={{uri:`${"https:"+itemExtra[0]?.gimg_chg}`}}/>

                        <RecommendItemDim isSelected={props?.isSelected}/>
                        {props?.isSelected &&
                            <RecommendItemInfoChecked isSelected={props?.isSelected} source={require("../../assets/icons/check_red.png")}/>
                        }
                    </RecommendItemImageWrapper>
                    <RecommendItemInfoWrapper>
                        <RecommendItemInfoTitle>{recommendData?.ITEM_NAME}</RecommendItemInfoTitle>
                        <RecommendItemInfoPrice>{recommendData?.ITEM_AMT==null?"":Number(recommendData?.ITEM_AMT).toLocaleString(undefined,{maximumFractionDigits:0})} 원</RecommendItemInfoPrice>
                    </RecommendItemInfoWrapper>
                </RecommendItemWrapper>
            </TouchableWithoutFeedback>

        </>
    )
}
export default RecommendItem;