import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { OptItemDim, OptItemImage, OptItemInfoChecked, OptItemInfoPrice, OptItemInfoTitle, OptItemInfoWrapper, OptItemWrapper } from '../../styles/main/detailStyle';


const OptItem = (props)=>{
    const optionData = props.optionData;
    const {menuDetailID, menuOptionGroupCode, menuOptionSelected} = useSelector((state)=>state.menuDetail);
    const [isSelected, setSelected] = useState(false);
    const [addtivePrice, setAdditivePrice] = useState();
    useEffect(()=>{
        // 옵션 선택한 메뉴 확인
        if(menuOptionSelected.length>0) {
            const checkMenu = menuOptionSelected.filter(el=>el.menuOptionGroupCode==optionData.ADDITIVE_GROUP_CODE);
            setSelected(checkMenu.length>0);
            // 선택한 메뉴리스트
            console.log("checkMenu: ",checkMenu);
            if(checkMenu.length>0){
                const checkedOption = checkMenu[0].menuOptionSelected;
                const itemList = optionData.ADDITIVE_ITEM_LIST;
                const filteredItem = itemList.filter(el=>el.ADDITIVE_ID==checkedOption);
                setAdditivePrice(filteredItem[0].ADDITIVE_SALE_PRICE);
            }
        }

    },[menuOptionGroupCode,menuOptionSelected])

    return(
        <>
            <TouchableWithoutFeedback onPress={props.onPress} >
                <OptItemWrapper>
                    <OptItemImage  source={{uri:`${optionData?.imgUrl}`}}/>
                    <OptItemDim isSelected={isSelected}/>
                    <OptItemInfoWrapper>
                        <OptItemInfoTitle>{optionData?.ADDITIVE_GROUP_NAME}</OptItemInfoTitle>
                        
                        <OptItemInfoPrice>{addtivePrice?"+"+Number(addtivePrice).toLocaleString(undefined,{maximumFractionDigits:0}):""}</OptItemInfoPrice>
                        
                        <OptItemInfoChecked isSelected={props?.isSelected} source={require("../../assets/icons/check_red.png")}/>
                    </OptItemInfoWrapper>
                </OptItemWrapper>
            </TouchableWithoutFeedback>

        </>
    )
}
export default OptItem