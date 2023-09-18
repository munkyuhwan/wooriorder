import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Animated,FlatList,Text,TouchableWithoutFeedback } from 'react-native'
import { MenuItemBottomWRapper, MenuItemButton, MenuItemButtonInnerWrapper, MenuItemButtonInnerWrapperLeft, MenuItemButtonInnerWrapperRight, MenuItemButtonWrapper, MenuItemHotness, MenuItemHotnessWrapper, MenuItemImage, MenuItemImageWrapper, MenuItemInfoWRapper, MenuItemName, MenuItemPrice, MenuItemTopWrapper, MenuItemWrapper } from '../../styles/main/menuListStyle';
import FastImage from 'react-native-fast-image';
import { RADIUS, RADIUS_DOUBLE } from '../../styles/values';
import { setMenuDetail } from '../../store/menuDetail';
import { addToOrderList } from '../../store/order';
import { MENU_DATA } from '../../resources/menuData';
/* 메인메뉴 메뉴 아이템 */
const MenuItem = ({item,index,setDetailShow}) => {
    //<MenuItemImage />    
    //console.log("item: ",item);
    const dispatch = useDispatch();

    const itemID = item.ITEM_ID;
    const imgUrl = item.imgUrl;
    const itemTitle = item.ITEM_NAME;
    const itemPrice= item.ITEM_AMT;
    const isNew = item.isNew;
    const isBest = item.isBest;
    const itemPk = item.itemPk;
    const menuDetailIndex = index
    const menuDetail = MENU_DATA.menuAll[menuDetailIndex];
    return(
        <>
            <MenuItemWrapper>
                <MenuItemTopWrapper>
                    <TouchableWithoutFeedback onPress={()=>{setDetailShow(true); dispatch(setMenuDetail(itemID)); }} >
                        <FastImage style={{width:'100%',height:183,resizeMode:"background",borderRadius:RADIUS_DOUBLE}} source={{uri:imgUrl}}/>
                    </TouchableWithoutFeedback>
                    <MenuItemImageWrapper>
                        <MenuItemHotnessWrapper>
                        {isNew==true&&
                            <MenuItemHotness source={require('../../assets/icons/new.png')} />
                        }
                        {isBest==true&&
                            <MenuItemHotness source={require('../../assets/icons/best.png')} />
                        }
                        </MenuItemHotnessWrapper>
                        <MenuItemButtonWrapper>
                            <TouchableWithoutFeedback onPress={()=>{setDetailShow(true);  dispatch(setMenuDetail(itemID)); }} >
                                <MenuItemButtonInnerWrapperRight>
                                    <MenuItemButton source={require('../../assets/icons/more.png')}/>
                                </MenuItemButtonInnerWrapperRight>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>{dispatch(addToOrderList({menuDetail,menuDetailIndex}))}} >
                                <MenuItemButtonInnerWrapperLeft>
                                    <MenuItemButton source={require('../../assets/icons/add.png')}/>
                                </MenuItemButtonInnerWrapperLeft>
                            </TouchableWithoutFeedback>
                        </MenuItemButtonWrapper>
                    </MenuItemImageWrapper>
                </MenuItemTopWrapper>
                <MenuItemBottomWRapper>
                    <MenuItemName>{itemTitle}</MenuItemName>
                    <MenuItemPrice>{itemPrice}원</MenuItemPrice>
                </MenuItemBottomWRapper>
            </MenuItemWrapper>
        </>
    );
}

export default MenuItem;
