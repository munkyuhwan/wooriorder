import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Animated,FlatList,Text,TouchableWithoutFeedback, View } from 'react-native'
import { MenuListWrapper } from 'styles/main/menuListStyle';
import MenuItem from '../mainComponents/menuItem';
import ItemDetail from '../detailComponents/itemDetail';
import { getMenu } from '../../store/menu';


const MenuListView = () => {
    const dispatch = useDispatch();

    const {menu} = useSelector((state)=>state.menu);
    const {selectedMainCategory} = useSelector((state)=>state.categories);
    const {selectedSubCategory} = useSelector((state)=>state.categories);

    const {language} = useSelector(state=>state.languages);
    const [isDetailShow, setDetailShow] = useState(false);
    useEffect(()=>{
        dispatch(getMenu());
    },[])
    return(
        <>
            <MenuListWrapper>
                <FlatList
                    columnWrapperStyle={{gap:12}}
                    style={{height:'100%', zIndex: 99 }}
                    data={menu}
                    renderItem={({item, index})=>{return(<MenuItem isDetailShow={isDetailShow} setDetailShow={setDetailShow} item={item} index={index} /> );}}
                    numColumns={3}
                    key={({item, index})=>{return "_"+index}}
                    keyExtractor={(item,index)=>index}
                />
            </MenuListWrapper>
            <ItemDetail isDetailShow={isDetailShow} setDetailShow={setDetailShow} language={language}/>
        </>
    );
}

export default MenuListView;
