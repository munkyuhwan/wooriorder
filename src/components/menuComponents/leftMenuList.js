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
    const {selectedMainCategory} = useSelector((state)=>state.categories);
    
    const {menuExtra} = useSelector(state=>state.menuExtra);
    console.log("menuExtra: ",menuExtra[0].pos_code)
    console.log("data: ",data[0].ITEM_GROUP_CODE)

    const onPressAction = (index, groupCode) =>{
        setSelectedIndex(index);
        props?.onSelectItem(groupCode);
    }
 
    return(
        <>
            {data?.map((item, index)=>{     
                return(
                    <TouchableWithoutFeedback key={"leftItem_"+index} onPress={()=>{{ onPressAction(index,item?.ITEM_GROUP_CODE); }}}>
                        <SideMenuItemWrapper>
                            {item?.ITEM_GROUP_CODE==selectedMainCategory &&
                                <SideMenuItemOn>
                                    <SideMenuText>{item?.ITEM_GROUP_NAME}</SideMenuText>
                                </SideMenuItemOn>
                            }
                            {item?.ITEM_GROUP_CODE!=selectedMainCategory &&
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