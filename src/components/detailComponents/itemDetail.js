import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BottomButton, BottomButtonIcon, BottomButtonText, BottomButtonWrapper, ButtonWrapper, DetailInfoWrapper, DetailItemInfoImage, DetailItemInfoMore, DetailItemInfoPrice, DetailItemInfoPriceWrapper, DetailItemInfoSource, DetailItemInfoTitle, DetailItemInfoTitleEtc, DetailItemInfoTitleWrapper, DetailItemInfoWrapper, DetailPriceMoreWrapper, DetailWhiteWrapper, DetailWrapper, OptList, OptListWrapper, OptRecommendWrapper, OptTitleText } from '../../styles/main/detailStyle';
import { ActivityIndicator, Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { colorBlack, colorRed } from '../../assets/colors/color';
import { LANGUAGE } from '../../resources/strings';
import OptItem from './optItem';
import CommonIndicator from '../common/waitIndicator';
import WaitIndicator from '../common/waitIndicator';
import RecommendItem from './recommendItem';
import { setMenuDetail, getSingleMenu, setMenuDetailInit } from '../../store/menuDetail';
import { numberWithCommas } from '../../utils/common';
import { MENU_DATA } from '../../resources/menuData';
import { addToOrderList } from '../../store/order';

const ItemDetail = (props) => {
    const language = props.language;
    const isDetailShow = props.isDetailShow;
    const dispatch = useDispatch();
    const {menuDetailIndex, menuDetail} = useSelector((state)=>state.menuDetail);
    const [detailZIndex, setDetailZIndex] = useState(0);

    // 선택된 옵션
    const [selectedOptions, setSelectedOptions] = useState([]);
    // 함께먹기 좋은 메뉴
    const [selectedRecommend, setSelectedRecommend] = useState([]);

    const optionSelect = menuDetail?.opts;
    const recommendMenu = menuDetail?.recommend;

    // animation set
    const [widthAnimation, setWidthAnimation] = useState(new Animated.Value(0));
    // width interpolation
    const animatedWidthScale = widthAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0,1],
    });
    const animatedWidthTranslate = widthAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0,30],
    });
    
    // height interpolation 
    const animatedHeightScale = widthAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0,1],
    });
    const animatedHeightTranslate = widthAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0,1],
    })

    const boxWidthStyle = {
        transform: [
            {scaleX:animatedWidthScale},
            {translateX:animatedWidthTranslate},
            {scaleY:animatedHeightScale}, 
            {translateY:animatedHeightTranslate}], 
        
    };
    const onSelectHandleAnimation = async (popOpen) => {
        Animated.timing(widthAnimation, {
            toValue:popOpen,
            duration: 150,
            useNativeDriver:true,
        }).start(()=>{             
            if(!isDetailShow) {
                setDetailZIndex(0)
            }
        }) 
    }
    
    useEffect(()=>{
        if(menuDetailIndex!= null) {
            dispatch(getSingleMenu(menuDetailIndex))
            //setDetailZIndex(999)
            //onSelectHandleAnimation(1);
        }else {
            onSelectHandleAnimation(0);
        }
    },[menuDetailIndex])

    const onOptionSelect = (index) =>{
        var tmpArr = selectedOptions;
        if(!tmpArr.includes(index)) {
            tmpArr.push(index);
        }else {
            tmpArr.splice(tmpArr.indexOf(index),1);
        }
        setSelectedOptions([...tmpArr])
    }
    const onRecommendSelect = (index) =>{
        var tmpArr = selectedRecommend;
        if(!tmpArr.includes(index)) {
            tmpArr.push(index);
        }else {
            tmpArr.splice(tmpArr.indexOf(index),1);
        }
        setSelectedRecommend([...tmpArr])
    }
    const addToCart = () => {
        dispatch(addToOrderList({menuDetailIndex, selectedOptions,selectedRecommend}))
        props.setDetailShow(false); dispatch(setMenuDetail(null)); init();
    }


    const init = () => {
        setSelectedOptions([]);
        setSelectedRecommend([]);
        dispatch(setMenuDetailInit());
    }
    useEffect(()=>{
        if(isDetailShow) {
            setDetailZIndex(999)
            onSelectHandleAnimation(1);
        }
    },[isDetailShow])

    return(
        <>
            <Animated.View  style={[{...PopStyle.animatedPop, ...boxWidthStyle,...{zIndex:detailZIndex} } ]} >
                    <DetailWrapper>
                        <DetailWhiteWrapper>
                            {menuDetailIndex==null &&
                                <WaitIndicator/>
                            }
                            {menuDetailIndex!=null &&
                            <>
                            {menuDetailIndex!=null &&
                                <DetailInfoWrapper>
                                    <DetailItemInfoImage source={menuDetail?.imgUrl?{uri:`${menuDetail?.imgUrl}`}:require("../../assets/icons/logo.png")}/>
                                    <DetailItemInfoWrapper>
                                        <DetailItemInfoTitleWrapper>
                                            <DetailItemInfoTitle>{menuDetail?.itemTitle}</DetailItemInfoTitle>
                                            {menuDetail?.isNew==true&&
                                                 <DetailItemInfoTitleEtc source={require("../../assets/icons/new.png")}/>
                                            }
                                            {menuDetail?.isBest==true&&
                                                <DetailItemInfoTitleEtc source={require("../../assets/icons/best.png")}/>
                                            }
                                        </DetailItemInfoTitleWrapper>
                                        <DetailItemInfoSource>{menuDetail?.detail}</DetailItemInfoSource>
                                        <DetailPriceMoreWrapper>
                                            <DetailItemInfoPriceWrapper>
                                                <DetailItemInfoPrice isBold={true} >{ menuDetail?.price?numberWithCommas(menuDetail?.price):""}</DetailItemInfoPrice><DetailItemInfoPrice isBold={false}> 원</DetailItemInfoPrice>
                                            </DetailItemInfoPriceWrapper>
                                            <DetailItemInfoMore>{menuDetail?.extra}</DetailItemInfoMore>
                                        </DetailPriceMoreWrapper>
                                    </DetailItemInfoWrapper>
                                </DetailInfoWrapper>
                            }
                            {menuDetailIndex!=null &&
                                <OptRecommendWrapper>
                                    <OptListWrapper>
                                        <OptTitleText>{LANGUAGE[language].detailView.selectOpt}</OptTitleText>
                                        <OptList horizontal showsHorizontalScrollIndicator={false} >
                                            {optionSelect!=null &&
                                                optionSelect.map((index,el)=>{
                                                    const optData= MENU_DATA.options[el];
                                                    return(
                                                        <OptItem key={"optItem_"+index} isSelected={selectedOptions.indexOf(optData?.index)>=0} optionData={el} menuData={menuDetail} onPress={()=>{ onOptionSelect(optData?.index); } } />    
                                                    );
                                                })
                                            }
                                            {optionSelect==null &&
                                                <OptItem key={"optItem_0"} optionData={{imgUrl:require("../../assets/icons/logo.png"),name:"loading...",price:0}} menuData={menuDetail}/>    
                                            }
                                        </OptList>
                                    </OptListWrapper>
                                    <OptListWrapper>
                                        <OptTitleText>{LANGUAGE[language].detailView.recommendMenu}</OptTitleText>
                                        <OptList horizontal showsHorizontalScrollIndicator={false} >
                                            {recommendMenu!=null&&
                                            recommendMenu.map((el,index)=>{
                                                const recommendItem = MENU_DATA.menuAll[el]
                                                return(
                                                    <RecommendItem key={"recoItem_"+index} isSelected={selectedRecommend.indexOf(recommendItem.index)>=0}  recommendData={el} menuData={menuDetail} onPress={()=>{onRecommendSelect(recommendItem.index)}}/>    
                                                );
                                            })
                                            }
                                        </OptList>
                                    </OptListWrapper>
                                </OptRecommendWrapper>
                            }   
                            <BottomButtonWrapper>
                                <TouchableWithoutFeedback onPress={()=>{props.setDetailShow(false); dispatch(setMenuDetail(null)); init();}}>
                                    <BottomButton backgroundColor={colorRed} >
                                        <BottomButtonText>{LANGUAGE[language].detailView.toMenu}</BottomButtonText>
                                        <BottomButtonIcon source={require("../../assets/icons/folk_nife.png")} />
                                    </BottomButton>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={()=>{addToCart()}}>
                                    <BottomButton backgroundColor={colorBlack} >
                                        <BottomButtonText>{LANGUAGE[language].detailView.addToCart}</BottomButtonText>
                                        <BottomButtonIcon source={require("../../assets/icons/cart_select.png")} />
                                    </BottomButton>
                                </TouchableWithoutFeedback>

                            </BottomButtonWrapper>
                            </>
                            }
                        </DetailWhiteWrapper>
                </DetailWrapper>
            </Animated.View>
        </>
    )  
}

const PopStyle = StyleSheet.create({
    animatedPop:{
        position:'absolute', 
        width:'100%',
        height:'100%',
        paddingTop:108,
     }

})

export default ItemDetail;