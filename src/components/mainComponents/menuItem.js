import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Animated,FlatList,Text,TouchableWithoutFeedback } from 'react-native'
import { MenuItemBottomWRapper, MenuItemButton, MenuItemButtonInnerWrapper, MenuItemButtonWrapper, MenuItemHotness, MenuItemHotnessWrapper, MenuItemImage, MenuItemImageWrapper, MenuItemInfoWRapper, MenuItemName, MenuItemPrice, MenuItemTopWrapper, MenuItemWrapper } from '../../styles/main/menuListStyle';
import FastImage from 'react-native-fast-image';
import { RADIUS, RADIUS_DOUBLE } from '../../styles/values';

const MenuItem = ({item}) => {
    //<MenuItemImage />
    const imgUrl = item.item.imgUrl;
    const itemName = item.item.itemName;
    const itemPrice= item.item.itemPrice;
    const itemPk = item.item.itemPk;


    return(
        <>
            <MenuItemWrapper>
                <MenuItemTopWrapper>
                    <FastImage style={{width:'100%',height:183,resizeMode:"background",borderRadius:RADIUS_DOUBLE}} source={{uri:imgUrl}}/>
                    <MenuItemImageWrapper>
                        <MenuItemHotnessWrapper>
                            <MenuItemHotness source={require('../../../assets/icons/new.png')} />
                            <MenuItemHotness source={require('../../../assets/icons/best.png')} />
                        </MenuItemHotnessWrapper>
                        <MenuItemButtonWrapper>
                            <MenuItemButtonInnerWrapper justifyContent={"flex-start"} >
                                <MenuItemButton source={require('../../../assets/icons/more.png')}/>
                            </MenuItemButtonInnerWrapper>
                            <MenuItemButtonInnerWrapper justifyContent={"flex-end"}>
                                <MenuItemButton source={require('../../../assets/icons/add.png')}/>
                            </MenuItemButtonInnerWrapper>
                        </MenuItemButtonWrapper>
                    </MenuItemImageWrapper>
                </MenuItemTopWrapper>
                <MenuItemBottomWRapper>
                    <MenuItemName>{itemName}</MenuItemName>
                    <MenuItemPrice>{itemPrice}원</MenuItemPrice>
                </MenuItemBottomWRapper>
            </MenuItemWrapper>
        </>
    );
}

export default MenuItem;
