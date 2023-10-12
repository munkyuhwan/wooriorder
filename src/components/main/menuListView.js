import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Animated,FlatList,Text,TouchableWithoutFeedback, View } from 'react-native'
import { MenuListWrapper } from 'styles/main/menuListStyle';
import MenuItem from '../mainComponents/menuItem';
import ItemDetail from '../detailComponents/itemDetail';
import { getDisplayMenu, getMenu, getMenuEdit, getMenuState, updateMenu } from '../../store/menu';
import { widthAnimationStyle } from '../../utils/animation';
import { setSelectedMainCategory } from '../../store/categories';
import { useSharedValue } from 'react-native-reanimated';


const MenuListView = () => {

    const dispatch = useDispatch();
    const listRef = useRef();

    const {menu, displayMenu} = useSelector((state)=>state.menu);
    const {isOn} = useSelector((state)=>state.cartView);
    const {language} = useSelector(state=>state.languages);

    const [numColumns, setNumColumns] = useState(3);
    const [isDetailShow, setDetailShow] = useState(false);

    //scroll
    const [isScrollEnd, setScrollEnd] = useState(true);
    const [isTouchEnd, setTouchEnd] = useState(false);

    const lastContentOffset = useSharedValue(0);
   //const isScrolling = useSharedValue(false);
    const dragStartPosition = useSharedValue(0);
    const dragEndPosition = useSharedValue(0);
    const scrollStart = useSharedValue(0);
    const scrollEnd = useSharedValue(0);

    // 선택 카테고리
    const {mainCategories, selectedMainCategory} = useSelector((state)=>state.categories);
    //console.log("menu:",menu[1].ITEM_LIST[0]);
    useEffect(()=>{
        if(isScrollEnd) {

            if(mainCategories.length > 0) {
                console.log(mainCategories);
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
                console.log("scrolling: ",mainCategories[nextPage].ITEM_GROUP_CODE);
                dispatch(setSelectedMainCategory(mainCategories[nextPage].ITEM_GROUP_CODE)); 
                setScrollEnd(false);
                //listRef.scrollToOffset({ animated: true, offset: 0 });
            }
        }
    },[isScrollEnd])
    useEffect(()=>{
        if(isScrollEnd && isTouchEnd) {
            /* const selectedCat = mainCategories.filter(e => e.ITEM_GROUP_CODE==selectedMainCategory);
            const selectedIndex = mainCategories.indexOf(selectedCat[0]);
            var nextPage = 0;
            console.log("scrollStart: ",scrollStart," scrollEnd: ",scrollEnd);
            if(dragEndPosition.value<dragStartPosition.value) {
                console.log('위로 스크롤')
                nextPage = selectedIndex+1;
                if(nextPage>mainCategories.length-1) nextPage=mainCategories.length-1;
            }else {
                console.log('아래로  스크롤')
                nextPage = selectedIndex-1;
                if(nextPage<0) nextPage=0;
            }
            console.log("nextpage: ",nextPage);
            dispatch(setSelectedMainCategory(mainCategories[nextPage].ITEM_GROUP_CODE)); 
            setScrollEnd(false); */
        }
    },[isScrollEnd, isTouchEnd])

    useEffect(()=>{
        if(isOn) {
            setNumColumns(2);
        }else {
            setNumColumns(3);
        }
    },[isOn])

    useEffect(()=>{
        dispatch(getDisplayMenu())
    },[selectedMainCategory])
    useEffect(()=>{
        if(mainCategories[0]) {
            dispatch(setSelectedMainCategory(mainCategories[0].ITEM_GROUP_CODE));
        }
    },[mainCategories])
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
                    }}
                    onTouchStart={(ev)=>{
                        //console.log("drag start: ",ev.nativeEvent.changedTouches[0].locationY) 
                        dragStartPosition.value = ev.nativeEvent.changedTouches[0].locationY;
                        setTouchEnd(false);
                        //setScrollEnd(true);
                    }}
                    onScrollEndDrag={(ev)=>{
                        //console.log("scroll end: ",ev.nativeEvent.contentOffset.y);
                        //dragEndPosition.value = ev.nativeEvent.contentOffset.y;
                        scrollEnd.value = ev.nativeEvent.contentOffset.y;
                        //isScrolling.value = false;
                        setScrollEnd(true);
                    }}
                    onScrollBeginDrag={(ev)=>{
                        //console.log("scroll begin: ",ev.nativeEvent.contentOffset.y);
                        //dragStartPosition.value = ev.nativeEvent.contentOffset.y;
                        //isScrolling.value = true;
                        scrollStart.value = ev.nativeEvent.contentOffset.y;                       
                    }}
                    
                />
            </MenuListWrapper>
            <ItemDetail isDetailShow={isDetailShow} setDetailShow={setDetailShow} language={language}/>
        </>
    );
}

export default MenuListView;
