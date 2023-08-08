import React, { useState } from 'react'
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
import { SideMenuItemTouchable } from '../common/sideMenuItem'

const SideMenu = () =>{


    return(
        <>
            <SideMenuWrapper>
                <LogoWrapper>
                    <LogoTop source={require("../../../assets/icons/logo.png")}  />
                </LogoWrapper>
                <SideMenuItemWrapper>
                    <SideMenuItemTouchable categoryId={"cat1"} categoryName={"카테고리01"} onItemPress={()=>{console.log("on side menu item press!");}} />
                    <SideMenuItemTouchable categoryId={"cat2"}  categoryName={"카테고리02"} onItemPress={()=>{console.log("on side menu item press!");}} />
                    <SideMenuItemTouchable categoryId={"cat3"}  categoryName={"카테고리03"} onItemPress={()=>{console.log("on side menu item press!");}} />
                    <SideMenuItemTouchable categoryId={"cat4"}  categoryName={"카테고리04"} onItemPress={()=>{console.log("on side menu item press!");}} />
                </SideMenuItemWrapper>

            </SideMenuWrapper>
        </>
    )
}

export default SideMenu