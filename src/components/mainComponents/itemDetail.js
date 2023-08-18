import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DetailInfoWrapper, DetailWrapper } from '../../styles/main/detailStyle';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { onMenuDetailView } from '../../store/menuDetail';

const ItemDetail = (props) => {
    const dispatch = useDispatch();
    const {menuDetailIndex} = useSelector(state=>state.menuDetail);
    
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
            console.log("open")
            onSelectHandleAnimation(1);
        }else {
            console.log("close")
            onSelectHandleAnimation(0);
        }
    },[menuDetailIndex])


    return(
        <>
            <Animated.View  style={[{...PopStyle.animatedPop, ...boxWidthStyle } ]} >
                <DetailWrapper>
                    <DetailInfoWrapper>
                        <TouchableWithoutFeedback onPress={()=>{dispatch(onMenuDetailView(null))}} ><Text style={{fontSize:20}} >닫기</Text></TouchableWithoutFeedback>
                    </DetailInfoWrapper>
                </DetailWrapper>
            </Animated.View>
        </>
    )  
}


export default ItemDetail;