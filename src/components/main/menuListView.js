import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Animated,FlatList,Text,TouchableWithoutFeedback, View } from 'react-native'
import { MenuListWrapper } from '../../styles/main/menuListStyle';
import MenuItem from '../mainComponents/menuItem';
import ItemDetail from '../detailComponents/itemDetail';


const MenuListView = () => {
    const {menu} = useSelector((state)=>state.mainMenu);
    const {language} = useSelector(state=>state.languageSelect);
    const {menuDetailIndex} = useSelector(state=>state.menuDetail);


    return(
        <>
            <MenuListWrapper>
                <FlatList
                    columnWrapperStyle={{gap:12}}
                    style={{height:'100%', zIndex: 99 }}
                    data={menu}
                    renderItem={({item, index})=>{return(<MenuItem item={item} index={index} /> );}}
                    numColumns={3}
                    keyExtractor={(item,index)=>index}
                />
            </MenuListWrapper>
            {menuDetailIndex!=null &&
                <ItemDetail language={language}/>  
            }
        </>
    );
}

export default MenuListView;
