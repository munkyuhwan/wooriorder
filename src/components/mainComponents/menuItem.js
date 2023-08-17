import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Animated,FlatList,Text,TouchableWithoutFeedback } from 'react-native'
import { MenuItemImage, MenuItemWrapper } from '../../styles/main/menuListStyle';

const MenuItem = (props) => {
    console.log(props)
    return(
        <>
            <MenuItemWrapper>
               <MenuItemImage source={{uri:"https://wooriorder.co.kr/order1/upload_file/goods/1689295630-akdsh.jpg"}} />
            </MenuItemWrapper>
        </>
    );
}

export default MenuItem;
