import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Animated,FlatList,Text,TouchableWithoutFeedback, View } from 'react-native'
import { MenuListWrapper } from 'styles/main/menuListStyle';
import MenuItem from '../mainComponents/menuItem';
import ItemDetail from '../detailComponents/itemDetail';
import { getMenu, getMenuEdit, getMenuState, updateMenu } from '../../store/menu';
import { widthAnimationStyle } from '../../utils/animation';


const MenuListView = () => {

    const dispatch = useDispatch();

    const {menu} = useSelector((state)=>state.menu);
    const {isOn} = useSelector((state)=>state.cartView);
    const [numColumns, setNumColumns] = useState(3);

    const {language} = useSelector(state=>state.languages);
    const [isDetailShow, setDetailShow] = useState(false);

    // 선택 카테고리
    const {selectedSubCategory, selectedMainCategory} = useSelector((state)=>state.categories);

    useEffect(()=>{
        if(isOn) {
            setNumColumns(2);
        }else {
            setNumColumns(3);
        }
    },[isOn])

    useEffect(()=>{
        //dispatch(getMenu());
    },[selectedSubCategory, selectedMainCategory])

    useEffect(()=>{
        //dispatch(updateMenu()) 
        //dispatch(getMenuState()) 
        //dispatch(getMenuEdit());
    },[])
/* 
    useEffect(()=>{
        console.log("menu: ",menu);
        const itemGroupList = menu[0].ITEM_GROUP_LIST;
        itemGroupList.map((el)=>{
            console.log("item: ",el);
        })
         
    },[menu])
 */
    return(
        <>
            <MenuListWrapper>
                {/* <FlatList
                    columnWrapperStyle={{gap:11}}
                    style={{height:'100%', zIndex: 99 }}
                    data={menu}
                    renderItem={({item, index})=>{return(<MenuItem isDetailShow={isDetailShow} setDetailShow={setDetailShow} item={item} index={index} /> );}}
                    numColumns={numColumns}
                    key={numColumns}
                    keyExtractor={(item,index)=>index}
                /> */}
            </MenuListWrapper>
            <ItemDetail isDetailShow={isDetailShow} setDetailShow={setDetailShow} language={language}/>
        </>
    );
}

export default MenuListView;
