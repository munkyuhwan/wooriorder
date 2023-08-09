import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    Image,
    StyleSheet,
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    Dimensions 
} from 'react-native'
import { HeaderLogo, HeaderWrapper } from '../../styles/header/header'
import { LogoTop, LogoWrapper, SideMenuItem, SideMenuItemWrapper, SideMenuWrapper } from '../../styles/main/sideMenuStyle'
import { SideMenuItemTouchable } from '../menuComponents/sideMenuItem'
import _ from "lodash";
const SideMenu = () =>{
    const {mainItemIndex, mainSelectedItemIndex} = useSelector((state)=>state.onClick);

    return(
        <>
            <SideMenuWrapper>
                <LogoWrapper>
                    <LogoTop source={require("../../../assets/icons/logo.png")}  />
                </LogoWrapper>
                <SideMenuItemWrapper>
                    {
                    <>
                        <SideMenuItemTouchable index={0} categoryId={"cat1"} categoryName={"카테고리01"} onItemPress={()=>{ }} />
                        <SideMenuItemTouchable index={1} categoryId={"cat2"}  categoryName={"카테고리02"} onItemPress={()=>{ }} />
                        <SideMenuItemTouchable index={2} categoryId={"cat3"}  categoryName={"카테고리03"} onItemPress={()=>{ }} />
                        <SideMenuItemTouchable index={3} categoryId={"cat4"}  categoryName={"카테고리04"} onItemPress={()=>{ }} />
                    </>
                    }
                </SideMenuItemWrapper>
            </SideMenuWrapper>
        </>
    )
}

export default SideMenu