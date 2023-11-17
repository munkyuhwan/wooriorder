import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Animated,FlatList,Text,TouchableWithoutFeedback, View } from 'react-native'
import { MenuListWrapper } from 'styles/main/menuListStyle';
import MenuItem from '../mainComponents/menuItem';
import ItemDetail from '../detailComponents/itemDetail';
import { getDisplayMenu, getMenu, getMenuEdit, getMenuState, updateMenu } from '../../store/menu';
import { widthAnimationStyle } from '../../utils/animation';
import { setSelectedMainCategory, setSelectedSubCategory } from '../../store/categories';
import { useSharedValue } from 'react-native-reanimated';
import { openFullSizePopup, openPopup } from '../../utils/common';
import { DEFAULT_CATEGORY_ALL_CODE } from '../../resources/defaults';


const MenuListView = () => {

    const dispatch = useDispatch();
    const listRef = useRef();

    const {displayMenu,menu} = useSelector((state)=>state.menu);
    const {isOn} = useSelector((state)=>state.cartView);
    const {language} = useSelector(state=>state.languages);

    const [numColumns, setNumColumns] = useState(3);
    const [isDetailShow, setDetailShow] = useState(false);

    //scroll
    const [isScrollEnd, setScrollEnd] = useState(true);
    const [isTouchEnd, setTouchEnd] = useState(false);
    const [isTouchStart, setTouchStart] = useState(false);
   //const isScrolling = useSharedValue(false);
    const dragStartPosition = useSharedValue(0);
    const dragEndPosition = useSharedValue(0);
    const scrollStart = useSharedValue(0);
    const scrollEnd = useSharedValue(0);
    // 선택 카테고리
    const {mainCategories, selectedMainCategory, selectedSubCategory} = useSelector((state)=>state.categories);

    //console.log("menu:",menu[1].ITEM_LIST[0]);
    useEffect(()=>{
        // 스크롤 될때
        /* if(isScrollEnd) {
            if(mainCategories.length > 0) {
                const selectedCat = mainCategories.filter(e => e.ITEM_GROUP_CODE==selectedMainCategory);
                const selectedIndex = mainCategories.indexOf(selectedCat[0]);
                var nextPage = 0;
                if(scrollStart.value==0 && scrollEnd.value==0) {
                    nextPage = selectedIndex-1;
                    if(nextPage<0) nextPage=0;
                }else {
                    if(scrollStart.value == scrollEnd.value) {
                        nextPage = selectedIndex+1;
                        if(nextPage>mainCategories.length-1) nextPage=mainCategories.length-1;
                    }else {
                        nextPage = selectedIndex;
                    }
                }
                dispatch(setSelectedMainCategory(mainCategories[nextPage].ITEM_GROUP_CODE)); 
                setScrollEnd(false);
            }
        } */
    },[isScrollEnd])
    useEffect(()=>{
        // 스크롤 안될때
       /*  if(!isTouchStart&&isTouchEnd) {
            const selectedCat = mainCategories.filter(e => e.ITEM_GROUP_CODE==selectedMainCategory);
            const selectedIndex = mainCategories.indexOf(selectedCat[0]);
            var nextPage = 0;
            if(dragEndPosition.value<dragStartPosition.value) {
                nextPage = selectedIndex+1;
                if(nextPage>mainCategories.length-1) nextPage=mainCategories.length-1;
            }else {
                nextPage = selectedIndex-1;
                if(nextPage<0) nextPage=0;
            }
            dispatch(setSelectedMainCategory(mainCategories[nextPage].ITEM_GROUP_CODE)); 
            setScrollEnd(false);  
        } */
    },[ isTouchEnd, isTouchStart])

    useEffect(()=>{
        if(isOn) {
            setNumColumns(2);
        }else {
            setNumColumns(3);
        }
    },[isOn])

    useEffect(()=>{
        if(isDetailShow)setDetailShow(false);
        dispatch(getDisplayMenu())
    },[selectedMainCategory,selectedSubCategory])

    useEffect(()=>{
        if(mainCategories[0]) {
            dispatch(setSelectedMainCategory(mainCategories[0].ITEM_GROUP_CODE));
        }
    },[mainCategories])

    useEffect(()=>{
        if(displayMenu.length<=0) {
            dispatch(getDisplayMenu());
        }
    },[displayMenu, menu])

    //console.log("mainCategories: ",mainCategories[0].ITEM_GR`OUP_CODE)
    return(
        <>
            <MenuListWrapper>
                <FlatList
                    ref={listRef}
                    columnWrapperStyle={{gap:11}}
                    style={{height:'100%', zIndex: 99 }}
                    data={displayMenu}
                    renderItem={({item, index})=>{return(<MenuItem isDetailShow={isDetailShow} setDetailShow={setDetailShow} item={item} index={index} /> );}}
                    numColumns={numColumns}
                    key={numColumns}
                    keyExtractor={(item,index)=>index}
                    onTouchEnd={(ev)=>{ 
                        //console.log("drag end: ",ev.nativeEvent.changedTouches[0].locationY) 
                        dragEndPosition.value = ev.nativeEvent.changedTouches[0].locationY;
                        setTouchEnd(true);
                        setTouchStart(false);
                    }}
                    onTouchStart={(ev)=>{
                        //console.log("drag start: ",ev.nativeEvent.changedTouches[0].locationY) 
                        dragStartPosition.value = ev.nativeEvent.changedTouches[0].locationY;
                        setTouchEnd(false);
                        setTouchStart(true);
                        //setScrollEnd(true);
                    }}
                    onScrollEndDrag={(ev)=>{
                        scrollEnd.value = ev.nativeEvent.contentOffset.y;
                        setScrollEnd(true);
                    }}
                    onScrollBeginDrag={(ev)=>{
                        scrollStart.value = ev.nativeEvent.contentOffset.y;                       
                    }}
                    
                />
            </MenuListWrapper>
            {isDetailShow&&
            <ItemDetail isDetailShow={isDetailShow} setDetailShow={setDetailShow} language={language}/>
            }
        </>
    );
}

export default MenuListView;
