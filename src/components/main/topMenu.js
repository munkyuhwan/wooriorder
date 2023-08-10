import React, { useState } from 'react'
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

const TopMenu = () =>{
    const test = [0,1,2,3,4,5,6,7,8,9];
    const [topSelection, setTopSelection] = useState(0);
    return(
        <>
            <TopMenuWrapper>
                <SafeAreaView>
                    <CategoryScrollView horizontal showsHorizontalScrollIndicator={false} >
                        <CategoryWrapper>
                            {
                                 test.map((index)=>{  
                                    if(index==topSelection) {
                                        return (
                                            <TopMenuItemTouchable selection={topSelection} setSelection={setTopSelection} index={index} categoryId={"subCat1"} categoryName={"2차 카테고리01"} onItemPress={()=>{}} />
                                            ) 
                                    }else {
                                        return (
                                            <TopMenuItemTouchableOff selection={topSelection} setSelection={setTopSelection} index={index} categoryId={"subCat1"} categoryName={"2차 카테고리01"} onItemPress={()=>{}} />
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
                    <TopButton onPress={()=>{console.log("on icon clicked");}} isSlideMenu={false} lr={"left"} onSource={require("../../../assets/icons/orderlist_trans.png")} offSource={require("../../../assets/icons/orderlist_grey.png")} />
                    <TopButton onPress={()=>{console.log("on icon clicked");}} isSlideMenu={true} lr={"right"} onSource={require("../../../assets/icons/cart_trans.png")} offSource={require("../../../assets/icons/cart_grey.png")} />
                </IconWrapper>
            </TopMenuWrapper>
        </>
    )
}

export default TopMenu