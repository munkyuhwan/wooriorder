import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Animated,FlatList,Text,TouchableWithoutFeedback } from 'react-native'
import { MenuListWrapper } from '../../styles/main/menuListStyle';
import MenuItem from '../mainComponents/menuItem';


const MenuListView = () => {
    return(
        <>
            <MenuListWrapper>
                <FlatList
                    columnWrapperStyle={{justifyContent:'space-between', paddingBottom:34}}
                    style={{height:'100%', backgroundColor:'blue'}}
                    data={[{},{},{},{},{},{},{},{},{},{},{},{},{},{}]}
                    renderItem={(item)=>{return(<MenuItem item={item} /> );}}
                    numColumns={3}
                    keyExtractor={(item,index)=>index}
                />
                    
            </MenuListWrapper>
        </>
    );
}

export default MenuListView;
