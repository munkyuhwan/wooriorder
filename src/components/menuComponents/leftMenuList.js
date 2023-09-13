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

    useEffect(()=>{
        if(selectIndex!=null) {
            props?.onSelectItem(selectIndex);
        }
    },[selectIndex])

    const onPressAction = (index) =>{
        setSelectedIndex(index);
    }

    return(
        <>
            {data?.map((item, index)=>{        
                  return(
                    <TouchableWithoutFeedback key={"leftItem_"+index} onPress={()=>{{ onPressAction(item?.index); }}}>
                        <SideMenuItemWrapper>
                            {index==selectIndex &&
                                <SideMenuItemOn>
                                    <SideMenuText>{item?.title}</SideMenuText>
                                </SideMenuItemOn>
                            }
                            {index!=selectIndex &&
                                <SideMenuItemOff>
                                    <SideMenuText>{item?.title}</SideMenuText>
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