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
import { SideMenuItemTouchable } from '../menuComponents/sideMenuItem'

const SideMenu = () =>{

    return(
        <>
            <SideMenuWrapper>
                <LogoWrapper>
                    <LogoTop source={require("../../../assets/icons/logo.png")}  />
                </LogoWrapper>
                <SideMenuItemWrapper>
                    <SideMenuItemTouchable index={0} categoryId={"cat1"} categoryName={"카테고리01"} onItemPress={()=>{console.log("on side menu item press!");}} />
                    <SideMenuItemTouchable index={1}  categoryId={"cat2"}  categoryName={"카테고리02"} onItemPress={()=>{console.log("on side menu item press!");}} />
                    <SideMenuItemTouchable index={2}  categoryId={"cat3"}  categoryName={"카테고리03"} onItemPress={()=>{console.log("on side menu item press!");}} />
                    <SideMenuItemTouchable index={3}  categoryId={"cat4"}  categoryName={"카테고리04"} onItemPress={()=>{console.log("on side menu item press!");}} />
                </SideMenuItemWrapper>
            </SideMenuWrapper>
        </>
    )
}

export default SideMenu