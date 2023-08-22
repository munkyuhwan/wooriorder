import React, { useEffect, useState } from 'react'
import { 
    SafeAreaView,
    TouchableWithoutFeedback
} from 'react-native'
import { HeaderLogo, HeaderWrapper } from '../../styles/header/header'
import { LogoTop, LogoWrapper, SideMenuItem, SideMenuItemWrapper, SideMenuWrapper } from '../../styles/main/sideMenuStyle'
import { SideMenuItemTouchable } from '../common/sideMenuItem'
import { TopMenuItemTouchable, TopMenuItemTouchableOff } from '../menuComponents/topMenuItem'
import { CategoryScrollView, CategoryWrapper, IconWrapper, TableName, TableNameBig, TableNameSmall, TopMenuWrapper, TouchIcon } from '../../styles/main/topMenuStyle'
 import TopButton from '../menuComponents/topButton'
import { useDispatch, useSelector } from 'react-redux'
import ItemDetail from '../detailComponents/itemDetail'
import { getSubCategories } from '../../store/categories'

const TopMenu = () =>{
    const dispatch = useDispatch();
    const {subCategories, selectedSubCategory} = useSelector((state)=>state.categories);
    useEffect(()=>{
        dispatch(getSubCategories());
    },[])

    return(
        <>
            <TopMenuWrapper>
                <SafeAreaView>
                    <CategoryScrollView horizontal showsHorizontalScrollIndicator={false} >
                        <CategoryWrapper>
                            {subCategories &&
                                subCategories.map((el)=>{
                                    if(el.index==selectedSubCategory) {
                                        return (
                                            <TopMenuItemTouchable  key={"top_"+el.index} index={el.index} categoryName={el.name} onItemPress={()=>{}} />
                                            ) 
                                    }else {
                                        return (
                                            <TopMenuItemTouchableOff  key={"top_"+el.index} index={el.index} categoryName={el.name} onItemPress={()=>{}} />
                                        )
                                    }
                                })
                            }
                       </CategoryWrapper>
                    </CategoryScrollView>
                </SafeAreaView>
                <TableName>
                    <TableNameSmall>TABLE 01</TableNameSmall>
                    <TableNameBig>테이블명</TableNameBig>
                </TableName>
                <IconWrapper>
                    <TopButton onPress={()=>{console.log("on icon clicked  aaa");}} isSlideMenu={false} lr={"left"} onSource={require("../../../assets/icons/orderlist_trans.png")} offSource={require("../../../assets/icons/orderlist_grey.png")} />
                    <TopButton onPress={()=>{console.log("on icon clicked");}} isSlideMenu={true} lr={"right"} onSource={require("../../../assets/icons/cart_trans.png")} offSource={require("../../../assets/icons/cart_grey.png")} />
                </IconWrapper>
            </TopMenuWrapper>
        </>
    )
}

export default TopMenu