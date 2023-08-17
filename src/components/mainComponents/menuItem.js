import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Animated,FlatList,Text,TouchableWithoutFeedback } from 'react-native'
import { MenuItemBottomWRapper, MenuItemButton, MenuItemButtonInnerWrapper, MenuItemButtonWrapper, MenuItemHotness, MenuItemHotnessWrapper, MenuItemImage, MenuItemImageWrapper, MenuItemInfoWRapper, MenuItemName, MenuItemPrice, MenuItemTopWrapper, MenuItemWrapper } from '../../styles/main/menuListStyle';

const MenuItem = (props) => {
    console.log(props)
    return(
        <>
            <MenuItemWrapper>
                <MenuItemTopWrapper>
                    <MenuItemImage source={{uri:"https://wooriorder.co.kr/order1/upload_file/goods/1689295630-akdsh.jpg"}} />
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
                    <MenuItemName>testtest</MenuItemName>
                    <MenuItemPrice>2000304원</MenuItemPrice>
                </MenuItemBottomWRapper>
            </MenuItemWrapper>
        </>
    );
}

export default MenuItem;
