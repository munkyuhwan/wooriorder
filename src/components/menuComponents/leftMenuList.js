import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import { colorRed, tabBaseColor } from '../../assets/colors/color';
import { SideMenuItemOff, SideMenuItemOn, SideMenuItemWrapper, SideMenuText } from '../../styles/main/sideMenuStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategories, setSelectedMainCategory } from '../../store/categories';
import { useFocusEffect } from '@react-navigation/native';
import { SideMenuItemTouchableOff } from './sideMenuItem';

const LeftMenuList = (props) => {
    const dispatch = useDispatch();
    const data = props?.data;
    const initSelect = props?.initSelect;
    const [selectIndex, setSelectedIndex] = useState(0);

    const onPressAction = (index, groupCode) =>{
        setSelectedIndex(index);
        props?.onSelectItem(groupCode);
    }
 
    return(
        <>
            {data?.map((item, index)=>{     
                console.log("item",index,": ",item);   
                return(
                    <TouchableWithoutFeedback key={"leftItem_"+index} onPress={()=>{{ onPressAction(index,item?.ITEM_GROUP_CODE); }}}>
                        <SideMenuItemWrapper>
                            {index==selectIndex &&
                                <SideMenuItemOn>
                                    <SideMenuText>{item?.ITEM_GROUP_NAME}</SideMenuText>
                                </SideMenuItemOn>
                            }
                            {index!=selectIndex &&
                                <SideMenuItemOff>
                                    <SideMenuText>{item?.ITEM_GROUP_NAME}</SideMenuText>
                                </SideMenuItemOff>
                            }
                        </SideMenuItemWrapper>
                    </TouchableWithoutFeedback>
                )
            })}
        </>
    )
}
export default LeftMenuList;