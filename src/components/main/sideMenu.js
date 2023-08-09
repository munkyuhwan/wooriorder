import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    Image,
    StyleSheet,
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    Dimensions, 
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native'
import { HeaderLogo, HeaderWrapper } from '../../styles/header/header'
import { LogoTop, LogoWrapper, SideBottomButton, SideBottomIcon, SideBottomText, SideBottomWrapper, SideMenuItem, SideMenuItemWrapper, SideMenuScrollView, SideMenuWrapper } from '../../styles/main/sideMenuStyle'
import { SideMenuItemTouchable } from '../menuComponents/sideMenuItem'
import _ from "lodash";
import { colorRed, colorWhite } from '../../../assets/colors/color'
const SideMenu = () =>{
    const {mainItemIndex, mainSelectedItemIndex} = useSelector((state)=>state.onClick);
    const test = [0,1,2,3,4,5,6,7,8,9];
    <>
    <SideMenuItemTouchable index={0} categoryId={"cat1"} categoryName={"카테고리01"} onItemPress={()=>{ }} />
    <SideMenuItemTouchable index={1} categoryId={"cat2"}  categoryName={"카테고리02"} onItemPress={()=>{ }} />
    <SideMenuItemTouchable index={2} categoryId={"cat3"}  categoryName={"카테고리03"} onItemPress={()=>{ }} />
    <SideMenuItemTouchable index={3} categoryId={"cat4"}  categoryName={"카테고리04"} onItemPress={()=>{ }} />
    <SideMenuItemTouchable index={3} categoryId={"cat4"}  categoryName={"카테고리04"} onItemPress={()=>{ }} />
</>
    return(
        <>
            <SideMenuWrapper>
                <LogoWrapper>
                    <LogoTop source={require("../../../assets/icons/logo.png")}  />
                </LogoWrapper>
                <SideMenuScrollView showsVerticalScrollIndicator={false} >
                    <SideMenuItemWrapper>
                        {
                            test.map((index)=>{
                                return (
                                    <SideMenuItemTouchable index={index} categoryId={"cat"+`${index}`} categoryName={"카테고리"+`${index}`} onItemPress={()=>{ }} />
                                )
                            })
                        }
                    </SideMenuItemWrapper>
                </SideMenuScrollView>
                <SideBottomWrapper>
                    <TouchableWithoutFeedback>
                        <SideBottomButton borderColor={colorWhite} >
                            <SideBottomText>언어선택</SideBottomText>
                            <SideBottomIcon source={require("../../../assets/icons/korean.png")}  />
                        </SideBottomButton>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <SideBottomButton bg={"red"} borderColor={colorRed} >
                            <SideBottomText>직원호출</SideBottomText>
                            <SideBottomIcon source={require("../../../assets/icons/bell_trans.png")}  />
                        </SideBottomButton>
                    </TouchableWithoutFeedback>

                </SideBottomWrapper>
            </SideMenuWrapper>
        </>
    )
}

export default SideMenu