import React, { useState } from 'react'
import { 
    SafeAreaView,
    TouchableWithoutFeedback
} from 'react-native'
import { HeaderLogo, HeaderWrapper } from '../../styles/header/header'
import { LogoTop, LogoWrapper, SideMenuItem, SideMenuItemWrapper, SideMenuWrapper } from '../../styles/main/sideMenuStyle'
import { SideMenuItemTouchable } from '../common/sideMenuItem'
import { TopMenuItemTouchable } from '../common/topMenuItem'
import { CategoryScrollView, CategoryWrapper, IconWrapper, TableName, TableNameBig, TableNameSmall, TopMenuWrapper, TouchIcon } from '../../styles/main/topMenuStyle'
import CartView from '../../styles/main/cartView'
import TopButton from '../common/topButton'

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
                    <TopButton onPress={()=>{console.log("on icon clicked");}}  lr={"left"} onSource={require("../../../assets/icons/orderlist_trans.png")} offSource={require("../../../assets/icons/orderlist_grey.png")} />
                    <TopButton onPress={()=>{console.log("on icon clicked");}}  lr={"right"} onSource={require("../../../assets/icons/cart_trans.png")} offSource={require("../../../assets/icons/cart_grey.png")} />
                </IconWrapper>
            </TopMenuWrapper>
        </>
    )
}

export default TopMenu