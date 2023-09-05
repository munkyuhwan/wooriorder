import React, { useEffect, useState } from 'react'
import { 
    SafeAreaView,
    Text,
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
import { getSubCategories, setSelectedSubCategory } from '../../store/categories'
import { openPopup, openTransperentPopup } from '../../utils/common'
import { colorWhite } from '../../assets/colors/color'
import TopMenuList from '../menuComponents/topMenuList'

const TopMenu = () =>{
    const dispatch = useDispatch();
    const {subCategories} = useSelector((state)=>state.categories);
    
    if(subCategories.length <=0) {
        return(<></>)
    }
    return(
        <>
            <TopMenuWrapper>
                <SafeAreaView>
                    <CategoryScrollView horizontal showsHorizontalScrollIndicator={false} >
                        <CategoryWrapper>
                            {subCategories.length>0 &&
                                <TopMenuList
                                    data={subCategories}
                                    onSelectItem={(index)=>{/* onSubcategorySelected(index) */}}
                                    initSelect={0}
                                />
                            }
                       </CategoryWrapper>
                    </CategoryScrollView>
                </SafeAreaView>
                <TableName>
                    <TableNameSmall>TABLE 01</TableNameSmall>
                    <TableNameBig>테이블명</TableNameBig>
                </TableName>
                <TouchableWithoutFeedback onPress={()=>{openPopup(dispatch,{innerView:"Setting", isPopupVisible:true}); }} >
                    <Text style={{color:colorWhite}} >설정</Text>
                </TouchableWithoutFeedback>
                <IconWrapper>
                    <TopButton onPress={()=>{console.log("on icon clicked  aaa");/* openPopup(dispatch,{innerView:"OrderList", isPopupVisible:true}); */  openTransperentPopup(dispatch, {innerView:"OrderList", isPopupVisible:true}); }} isSlideMenu={false} lr={"left"} onSource={require("../../assets/icons/orderlist_trans.png")} offSource={require("../../assets/icons/orderlist_grey.png")} />
                    <TopButton onPress={()=>{console.log("on icon clicked");}} isSlideMenu={true} lr={"right"} onSource={require("../../assets/icons/cart_trans.png")} offSource={require("../../assets/icons/cart_grey.png")} />
                </IconWrapper>
            </TopMenuWrapper>
        </>
    )
}

export default TopMenu