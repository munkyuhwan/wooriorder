import React, { useState, useRef, useEffect } from 'react'

import { SideMenuItem, SideMenuItemOn, SideMenuText } from '../../styles/main/sideMenuStyle'
import { Text, Animated, TouchableWithoutFeedback, Easing } from 'react-native'
import { RADIUS, RADIUS_DOUBLE } from '../../styles/values'
import { useDispatch, useSelector } from 'react-redux'
import { clickItem } from '../../store/onClick'

export const SideMenuItemTouchable = (props) =>{

    // state
    const dispatch = useDispatch();
    const {item} = useSelector((state)=>state.onClick);

    // animation set
    const [animation, setAnimation] = useState(new Animated.Value(0))
    const [widthAnimation, setWidthAnimation] = useState(new Animated.Value(0))
    const [radiusAnimation, setRadiusAnimation] = useState(new Animated.Value(0))
    

    // width interpolation
    const inputRange = [0, 1];
    const outputRange = [0, 10]
    const animatedWidth = widthAnimation.interpolate({inputRange, outputRange});
    const boxStyle = {
        transform: [{translateX:animatedWidth},],
      };
    // color interpolation
    const boxInterpolation =  animation.interpolate({
        inputRange: [0, 1],
        outputRange:["#404040" , "#ed3810"]
      })
    const animatedStyle = {
        backgroundColor: boxInterpolation,
        width:190,
        marginLeft:-10,
        marginTop:5,
    }

    const onSelectHandleAnimation = () => {
        dispatch(clickItem(props.categoryId))
        Animated.parallel([
            Animated.timing(animation, {
                toValue:1,
                duration: 200,
                useNativeDriver:true,
            }),
            Animated.timing(widthAnimation, {
                toValue: 1,
                duration: 100,
                useNativeDriver:true,
            }),
            Animated.timing(
                radiusAnimation,
                {
                    toValue: 9,
                    duration: 100,
                    useNativeDriver:true,
                }
            )
        ]).start();   
    }
    const onDeSelectHandleAnimation = () => {
        Animated.parallel([
            Animated.timing(animation, {
                toValue:0,
                duration: 200,
                useNativeDriver:true,
            }),
            Animated.timing(widthAnimation, {
                toValue: 0,
                duration: 100,
                useNativeDriver:true,
            }),
            Animated.timing(radiusAnimation,
                {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver:true,
                    easing: Easing.linear
                }
            )
        ]).start();   
    }
    

    useEffect(()=>{
        if(props.categoryId != item) {
            onDeSelectHandleAnimation();
        }
    },[item])
    return (
        <TouchableWithoutFeedback onPress={()=>{ onSelectHandleAnimation(); props.onItemPress(); }}>
            <Animated.View style={[{  ...animatedStyle,...boxStyle},{borderBottomRightRadius:radiusAnimation,borderTopRightRadius:radiusAnimation}]} >
                <SideMenuText>{props.categoryName}</SideMenuText>
            </Animated.View>
        </TouchableWithoutFeedback>

    )
 
}