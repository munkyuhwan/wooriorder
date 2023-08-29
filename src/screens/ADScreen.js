import React, { useEffect, useRef, useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { LoginActionInputID, LoginActionInputPW, LoginActionSubtitle, LoginActionTitle, LoginActionWrapper, LoginBtnIcon, LoginBtnText, LoginBtnWrapper, LoginLogo, LoginMainWrapper } from '../styles/login/loginStyle'
import { ADOrderBtnIcon, ADOrderBtnText, ADOrderBtnWrapper, ADWrapper, SwiperImage, SwiperScroll, SwiperVideo } from '../styles/ad/adStyle';
import { useSelector } from 'react-redux';
import { LANGUAGE } from '../resources/strings';
import Video from "react-native-video";
import SwipeRender from "react-native-swipe-render";


const ADScreen = () =>{

    const pwRef = useRef();
    const idRef = useRef();
    const {language} = useSelector(state=>state.languages);

    //<SwiperImage source={{uri:"https://wooriorder.co.kr/order1/upload_file/banner/1690442221-fnjjn.mp4"}}/>
    //<SwiperImage source={{uri:"https://wooriorder.co.kr/order1/upload_file/banner/1690442236-ehwgi.mp4"}}/>

    return(
        <>
            <ADWrapper>
            
            <SwiperScroll horizontal >
            <SwiperImage
                key={"SwipeRender-slide#"}
                source={{ uri: "https://luehangs.site/pic-chat-app-images/pexels-photo-853168.jpeg" }}
                style={{flex: 1}}
                resizeMode="contain"
            />
                <Video 
                    source={{uri:"https://wooriorder.co.kr/order1/upload_file/banner/1690442236-ehwgi.mp4"}} 
                    paused={false}
                    style={{width:'200px', height:'200px', backgroundColor:'red'}}
                    resizeMode={"contain"} 
                    repeat={true}
                /> 
                
            </SwiperScroll>
                
            {/* <SwipeRender
            data={[
                { uri: "https://luehangs.site/pic-chat-app-images/pexels-photo-853168.jpeg" },
                { uri: "https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg" },
                { uri: "https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg" },
                { uri: "https://luehangs.site/pic-chat-app-images/photo-755745.jpeg" },
                { uri: "https://wooriorder.co.kr/order1/upload_file/banner/1690442249-iqthj.mp4" },
                { uri: "https://wooriorder.co.kr/order1/upload_file/banner/1690442221-fnjjn.mp4" },
                { uri: "https://wooriorder.co.kr/order1/upload_file/banner/1690442236-ehwgi.mp4" },
            ]}
            renderItem={({ item, index }) => {
                if(item.uri.includes(".mp4")) {
                    return(<>
                        <Video 
                            source={{uri:item.uri}} 
                            paused={false}
                            style={{width:'100%', height:'100%'}}
                            resizeMode={"contain"} 
                            repeat={true}
                        /> 
                    </>)
                }else {
                    return (
                        <SwiperImage
                            key={"SwipeRender-slide#" + index}
                            source={{ uri: item.uri }}
                            style={{flex: 1}}
                            resizeMode="contain"
                        />
                    );
                }
            }}

            // OPTIONAL PROP USAGE.
            index={0} // default 0
            loop={true} // default false
            loadMinimal={true} // default false
            loadMinimalSize={2}
            autoplay={true} // default false
            horizontal={true} // default true
            enableAndroidViewPager={false} // default ScrollView
            // TO ENABLE AndroidViewPager:
            // react-native >= 0.60 - install @react-native-community/viewpager separately
            // react-native < 0.60 - ready to go!
        /> */}
           
                <ADOrderBtnWrapper>
                    <ADOrderBtnText>{LANGUAGE[language].adSCreen.letsOrder}</ADOrderBtnText>
                    <ADOrderBtnIcon source={require("assets/icons/folk_nife.png")} />
                </ADOrderBtnWrapper>
            </ADWrapper>
        </>
    )
}
export default ADScreen