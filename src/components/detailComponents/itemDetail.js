import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BottomButton, BottomButtonIcon, BottomButtonText, BottomButtonWrapper, ButtonWrapper, DetailInfoWrapper, DetailItemInfoImage, DetailItemInfoMore, DetailItemInfoPrice, DetailItemInfoPriceWrapper, DetailItemInfoSource, DetailItemInfoTitle, DetailItemInfoTitleEtc, DetailItemInfoTitleWrapper, DetailItemInfoWrapper, DetailPriceMoreWrapper, DetailWhiteWrapper, DetailWrapper, OptList, OptListWrapper, OptRecommendWrapper, OptTitleText } from '../../styles/main/detailStyle';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { onMenuDetailView } from '../../store/menuDetail';
import { colorBlack, colorRed } from '../../../assets/colors/color';
import { LANGUAGE } from '../../resources/strings';
import OptItem from './optItem';

const ItemDetail = (props) => {
    const dispatch = useDispatch();
    const {menuDetailIndex} = useSelector(state=>state.menuDetail);
    const {menu} = useSelector((state)=>state.mainMenu);
    const language = props.language;
    
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

    
    const PopStyle = StyleSheet.create({
        animatedPop:{
            position:'absolute', 
            zIndex:99, 
            width:'100%',
            height:'100%',
            paddingTop:108,
         }

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
            duration: 300,
            useNativeDriver:true,
        }).start(()=>{
            console.log("open vertical end");
            
        })
        
    }
    
    useEffect(()=>{
        if(menuDetailIndex!= null) {
            onSelectHandleAnimation(1);
        }else {
            onSelectHandleAnimation(0);
        }
    },[menuDetailIndex])


    return(
        <>
            <Animated.View  style={[{...PopStyle.animatedPop, ...boxWidthStyle } ]} >
                <DetailWrapper>
                    <DetailWhiteWrapper>
                        {/* 상단 제품 정보*/}
                        <DetailInfoWrapper>
                            <DetailItemInfoImage source={{uri:`${menu[menuDetailIndex]?.imgUrl}`}}/>
                            <DetailItemInfoWrapper>
                                <DetailItemInfoTitleWrapper>
                                    <DetailItemInfoTitle>고고제육면</DetailItemInfoTitle>
                                    <DetailItemInfoTitleEtc source={require("../../../assets/icons/new.png")}/>
                                    <DetailItemInfoTitleEtc source={require("../../../assets/icons/best.png")}/>
                                </DetailItemInfoTitleWrapper>
                                <DetailItemInfoSource>국내산/국내산</DetailItemInfoSource>
                                <DetailPriceMoreWrapper>
                                    <DetailItemInfoPriceWrapper>
                                        <DetailItemInfoPrice isBold={true} >23,000</DetailItemInfoPrice><DetailItemInfoPrice isBold={false}> 원</DetailItemInfoPrice>
                                    </DetailItemInfoPriceWrapper>
                                    <DetailItemInfoMore>이거 안먹으면 후회한다. 꼭 므그라</DetailItemInfoMore>
                                </DetailPriceMoreWrapper>
                            </DetailItemInfoWrapper>
                        </DetailInfoWrapper>
                        {/* 중간 옵션&추천메뉴*/}
                        <OptRecommendWrapper>
                            <OptListWrapper>
                                <OptTitleText>{LANGUAGE[language].detailView.selectOpt}</OptTitleText>
                                <OptList
                                    contentContainerStyle={{justifyContent:'flex-end', flexDirection:'row', alignItems:'center'}}
                                    data={[{},{},{},{},{},{},{},]}
                                    renderItem={({item,index})=>{return <OptItem {...item} /> }}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    pagingEnabled={true}
                                    legacyImplementation={false}
                                    ItemSeparatorComponent={() => {
                                        return <View style={[{ width: 15 }]} />
                                    }}
                                    automaticallyAdjustContentInsets={true}
                                />

                            </OptListWrapper>
                            <OptListWrapper>
                                <OptTitleText>{LANGUAGE[language].detailView.recommendMenu}</OptTitleText>
                                <OptList
                                
                                />
                            </OptListWrapper>
                        </OptRecommendWrapper>
                        {/* 하단 버튼*/}
                        <BottomButtonWrapper>
                            <TouchableWithoutFeedback onPress={()=>{dispatch(onMenuDetailView(null))}}>
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
                    </DetailWhiteWrapper>
                </DetailWrapper>
            </Animated.View>
        </>
    )  
}


export default ItemDetail;