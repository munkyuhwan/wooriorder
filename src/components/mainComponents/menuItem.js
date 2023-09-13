import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Animated,FlatList,Text,TouchableWithoutFeedback } from 'react-native'
import { MenuItemBottomWRapper, MenuItemButton, MenuItemButtonInnerWrapper, MenuItemButtonInnerWrapperLeft, MenuItemButtonInnerWrapperRight, MenuItemButtonWrapper, MenuItemHotness, MenuItemHotnessWrapper, MenuItemImage, MenuItemImageWrapper, MenuItemInfoWRapper, MenuItemName, MenuItemPrice, MenuItemTopWrapper, MenuItemWrapper } from '../../styles/main/menuListStyle';
import FastImage from 'react-native-fast-image';
import { RADIUS, RADIUS_DOUBLE } from '../../styles/values';
import { setMenuDetail } from '../../store/menuDetail';

const MenuItem = ({item,index,setDetailShow}) => {
    //<MenuItemImage />    
    console.log(item);
    const dispatch = useDispatch();
    const imgUrl = item.imgUrl;
    const itemTitle = item.title;
    const itemPrice= item.price;
    const isNew = item.isNew;
    const isBest = item.isBest;
    const itemPk = item.itemPk;

    return(
        <>
            <MenuItemWrapper>
                <MenuItemTopWrapper>
                    <TouchableWithoutFeedback onPress={()=>{setDetailShow(true);  dispatch(setMenuDetail(index)); }} >
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
                            <TouchableWithoutFeedback onPress={()=>{setDetailShow(true);  dispatch(setMenuDetail(index)); }} >
                                <MenuItemButtonInnerWrapperRight>
                                    <MenuItemButton source={require('../../assets/icons/more.png')}/>
                                </MenuItemButtonInnerWrapperRight>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>{}} >
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
