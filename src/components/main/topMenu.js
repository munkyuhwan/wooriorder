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
import { openFullSizePopup, openPopup, openTransperentPopup } from '../../utils/common'
import { colorWhite } from '../../assets/colors/color'
import TopMenuList from '../menuComponents/topMenuList'
import VersionCheck from 'react-native-version-check';

const TopMenu = () =>{
    const dispatch = useDispatch();
    const {subCategories} = useSelector((state)=>state.categories);
    const {tableInfo} = useSelector(state => state.tableInfo);
    
    const [currentVersion, setCurrentVersion ] = useState("version");

    useEffect(()=>{
        setCurrentVersion(VersionCheck.getCurrentVersion());
    },[])

    const onPressItem = (index) => {
        dispatch(setSelectedSubCategory(index)); 
    }
    /* 
    if(subCategories.length <=0) {
        return(<></>)
    }
     */
    return(
        <>
            <TopMenuWrapper>
                <SafeAreaView>
                    <CategoryScrollView  horizontal showsHorizontalScrollIndicator={false} >
                        <CategoryWrapper>
                            {//subCategories.length>0 &&
                                <TopMenuList
                                    data={subCategories}
                                    onSelectItem={(index)=>{ onPressItem(index); }}
                                    initSelect={0}
                                    key={subCategories.length}
                                />
                            }
                       </CategoryWrapper>
                    </CategoryScrollView>
                </SafeAreaView>
                <TableName>
                    <TableNameSmall>{tableInfo?.TBL_CODE}</TableNameSmall>
                    <TableNameBig>{tableInfo?.TBL_NAME}</TableNameBig>
                </TableName>
               {/* <TouchableWithoutFeedback onPress={()=>{openPopup(dispatch,{innerView:"Setting", isPopupVisible:true}); }} >  */}
                <TouchableWithoutFeedback onPress={()=>{openFullSizePopup(dispatch,{innerFullView:"Setting", isFullPopupVisible:true}); }} >
                    <Text style={{color:colorWhite}} >설정 {currentVersion}</Text>
                </TouchableWithoutFeedback>
                {/* 
                <IconWrapper>
                    <TopButton onPress={()=>{openTransperentPopup(dispatch, {innerView:"OrderList", isPopupVisible:true}); }} isSlideMenu={false} lr={"left"} onSource={require("../../assets/icons/orderlist_trans.png")} offSource={require("../../assets/icons/orderlist_grey.png")} />
                    <TopButton onPress={()=>{}} isSlideMenu={true} lr={"right"} onSource={require("../../assets/icons/cart_trans.png")} offSource={require("../../assets/icons/cart_grey.png")} />
                </IconWrapper> 
                */}
            </TopMenuWrapper>
        </>
    )
}

export default TopMenu