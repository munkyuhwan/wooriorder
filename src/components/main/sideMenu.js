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

const SideMenu = () =>{
    
    const [selectedItem, setSelectedItem] = useState(0);

    return(
        <>
            <SideMenuWrapper>
                <LogoWrapper>
                    <LogoTop source={require("../../../assets/icons/logo.png")}  />
                </LogoWrapper>
                <SideMenuItemWrapper>
                    <SideMenuItemTouchable index={0} selectedItem={selectedItem} setSelectedItem={setSelectedItem} categoryId={"cat1"} categoryName={"카테고리01"} onItemPress={()=>{ }} />
                    <SideMenuItemTouchable index={1} selectedItem={selectedItem} setSelectedItem={setSelectedItem} categoryId={"cat2"}  categoryName={"카테고리02"} onItemPress={()=>{ }} />
                    <SideMenuItemTouchable index={2} selectedItem={selectedItem} setSelectedItem={setSelectedItem} categoryId={"cat3"}  categoryName={"카테고리03"} onItemPress={()=>{ }} />
                    <SideMenuItemTouchable index={3} selectedItem={selectedItem} setSelectedItem={setSelectedItem} categoryId={"cat4"}  categoryName={"카테고리04"} onItemPress={()=>{ }} />
                </SideMenuItemWrapper>
            </SideMenuWrapper>
        </>
    )
}

export default SideMenu