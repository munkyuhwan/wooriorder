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

// 스크롤링 관련
var touchStartOffset = 0;
var touchEndOffset = 0;
var currentOffset = 0;
var scrollDownReached = false;
var scrollUpReached = false;
var isScrolling = false;
let direction = "";

const MenuListView = () => {

    const dispatch = useDispatch();
    const listRef = useRef();

    const {displayMenu,menu} = useSelector((state)=>state.menu);
    const {isOn} = useSelector((state)=>state.cartView);
    const {language} = useSelector(state=>state.languages);

    const [numColumns, setNumColumns] = useState(3);
    const [isDetailShow, setDetailShow] = useState(false);

    // 선택 카테고리
    const {mainCategories, selectedMainCategory, selectedSubCategory} = useSelector((state)=>state.categories);

    //console.log("menu:",menu[1].ITEM_LIST[0]);


    const toNextCaterogy = () =>{
        const selectedCat = mainCategories.filter(e => e.ITEM_GROUP_CODE==selectedMainCategory);
        const selectedIndex = mainCategories.indexOf(selectedCat[0]);
        var nextPage = 0;
        nextPage = selectedIndex+1;
        if(nextPage>mainCategories.length-1) nextPage=mainCategories.length-1;
        dispatch(setSelectedMainCategory(mainCategories[nextPage].ITEM_GROUP_CODE)); 
        dispatch(setSelectedSubCategory("0000"))
    }
    const toPrevCaterogy = () =>{
        const selectedCat = mainCategories.filter(e => e.ITEM_GROUP_CODE==selectedMainCategory);
        const selectedIndex = mainCategories.indexOf(selectedCat[0]);
        var nextPage = 0;
        nextPage = selectedIndex-1;
        if(nextPage<0) nextPage=0;
        if(nextPage>mainCategories.length-1) nextPage=mainCategories.length-1;
        dispatch(setSelectedMainCategory(mainCategories[nextPage].ITEM_GROUP_CODE)); 
        dispatch(setSelectedSubCategory("0000"))
    }
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
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 2;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };

    const isCloseToTop = ({contentOffset}) => {
        return contentOffset.y == 0;
    };
    //console.log("mainCategories: ",mainCategories[0].ITEM_GR`OUP_CODE)
    return(
        <>
            <MenuListWrapper
                
            >
                <FlatList
                    ref={listRef}
                    columnWrapperStyle={{gap:11}}
                    style={{height:'100%', zIndex: 99 }}
                    data={displayMenu}
                    renderItem={({item, index})=>{return(<MenuItem isDetailShow={isDetailShow} setDetailShow={setDetailShow} item={item} index={index} /> );}}
                    numColumns={numColumns}
                    key={numColumns}
                    keyExtractor={(item,index)=>index}
                    onTouchStart={(event)=>{
                        touchStartOffset = event.nativeEvent.pageY;
                    }}
                    onTouchEnd={(event)=>{   
                        // 스크롤 잇을떄는 호출 안됨
                        touchEndOffset = event.nativeEvent.pageY;
                        const touchSize = touchStartOffset - touchEndOffset;
                        
                        if(touchSize < 0) {
                            // swipe down
                            if( (touchSize*-1) > 25 ) {
                                // action
                                toPrevCaterogy();
                            }
                        }else {
                            // swipe up
                            if(touchSize>25) {
                                //action
                                toNextCaterogy();
                            } 
                        }
                        
                    }}
                    onScroll={(event)=>{
                        //console.log("on scroll========================================================");
                        direction = event.nativeEvent.contentOffset.y > currentOffset ? 'down' : 'up';
                        currentOffset = event.nativeEvent.contentOffset.y;
                        
                        scrollDownReached = false;
                        scrollUpReached = false;
                        

                        if (isCloseToBottom(event.nativeEvent)) {
                            if(direction == "down") scrollDownReached = true; scrollUpReached = false;
                        }
                        if (isCloseToTop(event.nativeEvent)) {
                            if(direction == 'up') scrollUpReached = true; scrollDownReached = false;
                        }
                    }}
                    onScrollBeginDrag={(ev)=>{
                        // 스크롤 없을떄는 호출 안됨
                        //console.log("drag start========================================================");
                        //console.log("scroll up reached: ",scrollUpReached, " scroll down reached: ",scrollDownReached);
                        if(scrollDownReached) {
                            //toNextCaterogy();
                            //scrollUpReached = false;
                            //scrollDownReached  = false;
                        }
                        if(scrollUpReached) {
                            //toPrevCaterogy();
                        // scrollUpReached = false;
                        // scrollDownReached  = false;
                        }
                        // 스크롤 되고 있는지 체크
                        isScrolling=true;
                        //scrollStart.value = ev.nativeEvent.contentOffset.y;                       
                    }}
                    onScrollEndDrag={(ev)=>{
                        // 스크롤 없을떄는 호출 안됨
                        // 스크롤 되고 있는지 체크
                        //isScrolling=false;
                        if(scrollDownReached ) {
                            toNextCaterogy();
                        }
                        if(scrollUpReached) {
                            toPrevCaterogy();
                        }
                        //scrollEnd.value = ev.nativeEvent.contentOffset.y;
                        //setScrollEnd(true);
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
