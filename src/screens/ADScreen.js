import React, { useEffect, useRef, useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { LoginActionInputID, LoginActionInputPW, LoginActionSubtitle, LoginActionTitle, LoginActionWrapper, LoginBtnIcon, LoginBtnText, LoginBtnWrapper, LoginLogo, LoginMainWrapper } from '../styles/login/loginStyle'
import { ADOrderBtnIcon, ADOrderBtnText, ADOrderBtnWrapper, ADWrapper, SwiperImage, SwiperScroll, SwiperVideo } from '../styles/ad/adStyle';
import { useSelector } from 'react-redux';
import { LANGUAGE } from '../resources/strings';
import Video from "react-native-video";
import SwipeRender from "react-native-swipe-render";
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';


const ADScreen = () =>{
    const navigation = useNavigation();
    const {language} = useSelector(state=>state.languages);
    const {adList} = useSelector(state=>state.ad);
    // 영상 플레이, 스톱
    const [videoIndex, setVideoIndex] = useState(0);
    const swiperRef = useRef(); 
    const onSwipe = (index) =>{
        setVideoIndex(index)
    }
    return(
        <>
            <ADWrapper>
            <Swiper  
                ref={swiperRef}
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={10}
                loop={true}
                scrollEnabled={false}
                activeDot={<></>}
                dot={<></>}
                onIndexChanged={(index)=>{ onSwipe(index); }}
            >
                {adList &&
                    adList.map((el,index)=>{
                        if(el.uri.includes(".mp4")) {
                            return(
                                <>
                                    <SwiperVideo
                                        key={el.index}
                                        source={{uri: el.uri}} 
                                        paused={videoIndex!=index}
                                        repeat={true}
                                    />
                                </>
                            )
                        }else {
                            return(
                                <>
                                    <SwiperImage
                                        key={el.index}
                                        source={{ uri: el.uri }}
                                    />
                                </>
                            )
                        }
                        
                    })
                }
            </Swiper>
                <TouchableWithoutFeedback onPress={()=>{navigation.navigate("main")}}>
                    <ADOrderBtnWrapper>
                        <ADOrderBtnText>{LANGUAGE[language].adSCreen.letsOrder}</ADOrderBtnText>
                        <ADOrderBtnIcon source={require("assets/icons/folk_nife.png")} />
                    </ADOrderBtnWrapper>
                </TouchableWithoutFeedback>
            </ADWrapper>
        </>
    )
}
export default ADScreen