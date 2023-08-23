import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BottomButton, BottomButtonIcon, BottomButtonText, BottomButtonWrapper, ButtonWrapper, DetailInfoWrapper, DetailItemInfoImage, DetailItemInfoMore, DetailItemInfoPrice, DetailItemInfoPriceWrapper, DetailItemInfoSource, DetailItemInfoTitle, DetailItemInfoTitleEtc, DetailItemInfoTitleWrapper, DetailItemInfoWrapper, DetailPriceMoreWrapper, DetailWhiteWrapper, DetailWrapper, OptList, OptListWrapper, OptRecommendWrapper, OptTitleText } from '../../styles/main/detailStyle';
import { ActivityIndicator, Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { colorBlack, colorRed } from '../../../assets/colors/color';
import { LANGUAGE } from '../../resources/strings';
import OptItem from './optItem';
import CommonIndicator from '../common/waitIndicator';
import WaitIndicator from '../common/waitIndicator';
import RecommendItem from './recommendItem';
import { setMenuDetail, getSingleMenu } from '../../store/menuDetail';

const ItemDetail = (props) => {
    const language = props.language;
    const isDetailShow = props.isDetailShow;
    const dispatch = useDispatch();
    const {menuDetailIndex, menuDetail} = useSelector((state)=>state.menuDetail);
    const [detailZIndex, setDetailZIndex] = useState(0);

    const optionSelect = menuDetail?.options;
    const recommendMenu = menuDetail?.recommendMenu;
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
        console.log("start opening");
        Animated.timing(widthAnimation, {
            toValue:popOpen,
            duration: 300,
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

    useEffect(()=>{
        console.log("isDetailShow: ",isDetailShow)
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
                                    <DetailItemInfoImage source={menuDetail?.imgUrl?{uri:`${menuDetail?.imgUrl}`}:require("../../../assets/icons/logo.png")}/>
                                    <DetailItemInfoWrapper>
                                        <DetailItemInfoTitleWrapper>
                                            <DetailItemInfoTitle>{menuDetail?.itemName}</DetailItemInfoTitle>
                                            <DetailItemInfoTitleEtc source={require("../../../assets/icons/new.png")}/>
                                            <DetailItemInfoTitleEtc source={require("../../../assets/icons/best.png")}/>
                                        </DetailItemInfoTitleWrapper>
                                        <DetailItemInfoSource>{menuDetail?.itemAddtion}</DetailItemInfoSource>
                                        <DetailPriceMoreWrapper>
                                            <DetailItemInfoPriceWrapper>
                                                <DetailItemInfoPrice isBold={true} >23,000</DetailItemInfoPrice><DetailItemInfoPrice isBold={false}> 원</DetailItemInfoPrice>
                                            </DetailItemInfoPriceWrapper>
                                            <DetailItemInfoMore>이거 안먹으면 후회한다. 꼭 므그라</DetailItemInfoMore>
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
                                                optionSelect.map((el,index)=>{
                                                    return(
                                                        <OptItem key={"optItem_"+index} optionData={el} menuData={menuDetail}/>    
                                                    );
                                                })
                                            }
                                            {optionSelect==null &&
                                                <OptItem key={"optItem_0"} optionData={{imgUrl:require("../../../assets/icons/logo.png"),name:"loading...",price:0}} menuData={menuDetail}/>    
                                            }
                                        </OptList>
                                    </OptListWrapper>
                                    <OptListWrapper>
                                        <OptTitleText>{LANGUAGE[language].detailView.recommendMenu}</OptTitleText>
                                        <OptList horizontal showsHorizontalScrollIndicator={false} >
                                            {recommendMenu!=null&&
                                            recommendMenu.map((el,index)=>{
                                                return(
                                                    <RecommendItem key={"recoItem_"+index} recommendData={el} menuData={menuDetail}/>    
                                                );
                                            })
                                            }
                                        </OptList>
                                    </OptListWrapper>
                                </OptRecommendWrapper>
                            }   
                            <BottomButtonWrapper>
                                <TouchableWithoutFeedback onPress={()=>{props.setDetailShow(false); dispatch(setMenuDetail(null))}}>
                                    <BottomButton backgroundColor={colorRed} >
                                        <BottomButtonText>{LANGUAGE[language].detailView.toMenu}</BottomButtonText>
                                        <BottomButtonIcon source={require("../../../assets/icons/folk_nife.png")} />
                                    </BottomButton>
                                </TouchableWithoutFeedback>
                                <BottomButton backgroundColor={colorBlack} >
                                    <BottomButtonText>{LANGUAGE[language].detailView.addToCart}</BottomButtonText>
                                    <BottomButtonIcon source={require("../../../assets/icons/cart_select.png")} />
                                </BottomButton>
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