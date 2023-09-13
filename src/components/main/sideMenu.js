import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableWithoutFeedback} from 'react-native'
import { LogoTop, LogoWrapper, SideBottomButton, SideBottomIcon, SideBottomText, SideBottomWrapper, SideMenuItem, SideMenuItemWrapper, SideMenuScrollView, SideMenuWrapper } from '../../styles/main/sideMenuStyle'
import _ from "lodash";
import { colorRed, colorWhite } from '../../assets/colors/color'
import { openFullSizePopup, openPopup, openTransperentPopup } from '../../utils/common'
import LeftMenuList from '../menuComponents/leftMenuList'
import { getMainCategories, getSubCategories, setSelectedMainCategory } from '../../store/categories';
const SideMenu = () =>{
    const dispatch = useDispatch();
    const {mainCategories} = useSelector((state)=>state.categories);
    // 메뉴 아이템 받아오기 
    useEffect(()=>{
        dispatch(getMainCategories());
    },[])
    const onItemPress = (index) =>{
        dispatch(setSelectedMainCategory(index)); 
    }

    // 문제 없으면 /components/menuComponents/sideMenuItem.js 제거
    if(mainCategories.length <=0) {
        return(<></>)
    }
    return(
        <>
            <SideMenuWrapper>
                <LogoWrapper>
                    <LogoTop source={require("../../assets/icons/logo.png")}  />
                </LogoWrapper>
                <SideMenuScrollView showsVerticalScrollIndicator={false} >
                    <SideMenuItemWrapper>
                        {mainCategories &&
                            <LeftMenuList
                                data={mainCategories}
                                onSelectItem={(index)=>{onItemPress(index);}}
                                initSelect={0}
                            />
                        }
                    </SideMenuItemWrapper>
                </SideMenuScrollView>
                <SideBottomWrapper>
                    <TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{openPopup(dispatch, {innerView:"LanguageSelectPopup", isPopupVisible:true}); }} >
                            <SideBottomButton borderColor={colorWhite} >
                                <SideBottomText>언어선택</SideBottomText>
                                <SideBottomIcon source={require("../../assets/icons/korean.png")} />
                            </SideBottomButton>
                        </TouchableWithoutFeedback>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{openFullSizePopup(dispatch, {innerFullView:"CallServer", isFullPopupVisible:true});}} >
                        <SideBottomButton bg={"red"} borderColor={colorRed} >
                            <SideBottomText>직원호출</SideBottomText>
                            <SideBottomIcon source={require("../../assets/icons/bell_trans.png")}  />
                        </SideBottomButton>
                    </TouchableWithoutFeedback>

                </SideBottomWrapper>
            </SideMenuWrapper>
        </>
    )
}

export default SideMenu