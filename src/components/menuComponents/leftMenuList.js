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
    const {selectedMainCategory,mainCategories} = useSelector((state)=>state.categories);


    const {menuCategories} = useSelector(state=>state.menuExtra);
    const {language} =  useSelector(state=>state.languages);
    //console.log("menuCategories: ",menuCategories);
    // 이미지 찾기
    //const itemExtra = menuExtra.filter(el=>el.pos_code == item.ITEM_ID);

    const onPressAction = (index, groupCode) =>{
        setSelectedIndex(index);
        props?.onSelectItem(groupCode);
    }
    const ItemTitle = (categoryID, index) => {
        let selTitleLanguage = "";
        const selExtra = menuCategories?.filter(el=>el.cate_code1==categoryID);
        
        if(language=="korean") {
            selTitleLanguage = data[index]?.ITEM_GROUP_NAME;
        }
        else if(language=="japanese") {
            selTitleLanguage = selExtra[0]?.cate_name1_jp;
        }
        else if(language=="chinese") {
            selTitleLanguage = selExtra[0]?.cate_name1_cn;
        }
        else if(language=="english") {
            selTitleLanguage = selExtra[0]?.cate_name1_en;
        }

        return selTitleLanguage;
         
    }
    return(
        <>
            {data?.map((item, index)=>{     
                return(
                    <TouchableWithoutFeedback key={"leftItem_"+index} onPress={()=>{{ onPressAction(index,item?.ITEM_GROUP_CODE); }}}>
                        <SideMenuItemWrapper>
                            {item?.ITEM_GROUP_CODE==selectedMainCategory &&
                                <SideMenuItemOn>
                                    <SideMenuText>{ItemTitle(item?.ITEM_GROUP_CODE,index) }</SideMenuText>
                                </SideMenuItemOn>
                            }
                            {item?.ITEM_GROUP_CODE!=selectedMainCategory &&
                                <SideMenuItemOff>
                                    <SideMenuText>{ItemTitle(item?.ITEM_GROUP_CODE,index)}</SideMenuText>
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