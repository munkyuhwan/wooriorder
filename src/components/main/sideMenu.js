import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableWithoutFeedback} from 'react-native'
import { HeaderLogo, HeaderWrapper } from '../../styles/header/header'
import { LogoTop, LogoWrapper, SideBottomButton, SideBottomIcon, SideBottomText, SideBottomWrapper, SideMenuItem, SideMenuItemWrapper, SideMenuScrollView, SideMenuWrapper } from '../../styles/main/sideMenuStyle'
import { SideMenuItemTouchable, SideMenuItemTouchableOff } from '../menuComponents/sideMenuItem'
import _ from "lodash";
import { colorRed, colorWhite } from '../../assets/colors/color'
import { setPopupVisibility } from '../../store/popup'
import { getMainCategories } from '../../store/categories'
import { getMenu } from '../../store/menu'
import LanguageSelectPopup from '../popups/languageSelectPopup'
const SideMenu = () =>{
    const dispatch = useDispatch();
    const {mainCategories, selectedMainCategory} = useSelector((state)=>state.categories);
    useEffect(()=>{
        dispatch(getMainCategories());
    },[])


    return(
        <>
            <SideMenuWrapper>
                <LogoWrapper>
                    <LogoTop source={require("../../assets/icons/logo.png")}  />
                </LogoWrapper>
                <SideMenuScrollView showsVerticalScrollIndicator={false} >
                    <SideMenuItemWrapper>
                        {mainCategories &&
                            mainCategories?.map((el)=>{
                                if(el.index==selectedMainCategory) {
                                    return (
                                        <SideMenuItemTouchable key={"side_"+el.index} item={el} onItemPress={()=>{}} />
                                    ) 
                                }else {
                                    return (
                                        <SideMenuItemTouchableOff key={"side_"+el.index} item={el} onItemPress={()=>{ dispatch(getMenu());  }} />
                                    )
                                }
                            })
                        }
                    </SideMenuItemWrapper>
                </SideMenuScrollView>
                <SideBottomWrapper>
                    <TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{ dispatch(setPopupVisibility({isOpen:true,popupType:"LanguageSelectPopup"}));}} >
                            <SideBottomButton borderColor={colorWhite} >
                                <SideBottomText>언어선택</SideBottomText>
                                <SideBottomIcon source={require("../../assets/icons/korean.png")} />
                            </SideBottomButton>
                        </TouchableWithoutFeedback>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
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