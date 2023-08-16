import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Animated,FlatList,Text,TouchableWithoutFeedback } from 'react-native'
import { MenuItemImage, MenuItemWrapper } from '../../styles/main/menuListStyle';

const MenuItem = (props) => {
    console.log(props)
    return(
        <>
            <MenuItemWrapper>
                <Text>items {props.item.index}</Text>
               <MenuItemImage />
            </MenuItemWrapper>
        </>
    );
}

export default MenuItem;
