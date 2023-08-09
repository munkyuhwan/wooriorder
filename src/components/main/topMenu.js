import React, { useState } from 'react'
import { 
    Image,
    StyleSheet,
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    Dimensions, 
    SafeAreaView,
    TouchableWithoutFeedback
} from 'react-native'
import { HeaderLogo, HeaderWrapper } from '../../styles/header/header'
import { LogoTop, LogoWrapper, SideMenuItem, SideMenuItemWrapper, SideMenuWrapper } from '../../styles/main/sideMenuStyle'
import { SideMenuItemTouchable } from '../common/sideMenuItem'
import { TopMenuItemTouchable } from '../common/topMenuItem'
import { CategoryScrollView, CategoryWrapper, IconWrapper, TableName, TableNameBig, TableNameSmall, TopMenuWrapper, TouchIcon } from '../../styles/main/topMenuStyle'
import CartView from '../../styles/main/cartView'

const TopMenu = () =>{


    return(
        <>
            <TopMenuWrapper>
                <SafeAreaView>
                    <CategoryScrollView horizontal showsHorizontalScrollIndicator={false} >
                        <CategoryWrapper>
                            <TopMenuItemTouchable index={0} categoryId={"subCat1"} categoryName={"2차 카테고리01"} onItemPress={()=>{console.log("on side menu item press!");}} />
                            <TopMenuItemTouchable index={1} categoryId={"subCat2"} categoryName={"2차 카테고리02"} onItemPress={()=>{console.log("on side menu item press!");}} />
                            <TopMenuItemTouchable index={2} categoryId={"subCat3"} categoryName={"2차 카테고리03"} onItemPress={()=>{console.log("on side menu item press!");}} />
                            <TopMenuItemTouchable index={3} categoryId={"subCat4"} categoryName={"2차 카테고리04"} onItemPress={()=>{console.log("on side menu item press!");}} />
                            <TopMenuItemTouchable index={4} categoryId={"subCat5"} categoryName={"2차 카테고리05"} onItemPress={()=>{console.log("on side menu item press!");}} />    
                        </CategoryWrapper>
                    </CategoryScrollView>
                </SafeAreaView>
                <TableName>
                    <TableNameSmall>TABLE 01</TableNameSmall>
                    <TableNameBig>테이블명</TableNameBig>
                </TableName>
                <IconWrapper>
                    <TouchableWithoutFeedback onPress={()=>{console.log("on icon clicked");}}>
                        <TouchIcon source={require("../../../assets/icons/orderlist_grey.png")} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <TouchIcon source={require("../../../assets/icons/cart_grey.png")} />
                    </TouchableWithoutFeedback>

                </IconWrapper>
            </TopMenuWrapper>
        </>
    )
}

export default TopMenu