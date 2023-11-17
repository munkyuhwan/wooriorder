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
                    onScroll={(event)=>{
                        //console.log("on scroll========================================================");
                        let direction = event.nativeEvent.contentOffset.y > currentOffset ? 'down' : 'up';
                        currentOffset = event.nativeEvent.contentOffset.y;
                        console.log("scroll direction:",direction); // up or down accordingly
                        
                        scrollDownReached = false;
                        scrollUpReached = false;
                        

                        if (isCloseToBottom(event.nativeEvent)) {
                            console.log("close to bottom");
                            if(direction == "down") scrollDownReached = true; scrollUpReached = false;
                        }
                        if (isCloseToTop(event.nativeEvent)) {
                            console.log("reach to Top");
                            if(direction == 'up') scrollUpReached = true; scrollDownReached = false;
                        }

                    }}
                    onTouchStart={(event)=>{
                        console.log("touch start========================================================");
                        touchStartOffset = event.nativeEvent.locationY;
                        console.log("touchs start: ",event.nativeEvent.locationY);
                    }}
                    onTouchEnd={(event)=>{   
                        // 스크롤 잇을떄는 호출 안됨
                        console.log("touch end========================================================");
                        touchEndOffset = event.nativeEvent.locationY;
                        console.log("touchStartOffset: ",touchStartOffset," touchEndOffset: ",touchEndOffset);
                        const touchSize = touchStartOffset - touchEndOffset;
                        console.log("touchSize: ",touchSize);
                        if(touchSize < 0) {
                            // swipe down
                            if( (touchSize*-1) > 50 ) {
                                // action
                                console.log("prev page");
                                toPrevCaterogy();
                                //touchEndOffset = 0;
                                //touchStartOffset = 0;
                            }
                        }else {
                            // swipe up
                            if(touchSize>50) {
                                //action
                                console.log("next page");
                                toNextCaterogy();
                                //touchEndOffset = 0;
                                //touchStartOffset = 0;
                            } 
                        }
                        //console.log("scroll up reached: ",scrollUpReached, " scroll down reached: ",scrollDownReached);

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
                        console.log("drag end========================================================");
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
