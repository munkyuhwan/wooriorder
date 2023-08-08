import React, { useState, useRef, useEffect } from 'react'

import { Text, Animated, TouchableWithoutFeedback, Easing } from 'react-native'
import { RADIUS, RADIUS_DOUBLE } from '../../styles/values'
import { useDispatch, useSelector } from 'react-redux'
import { clickMainItem, clickTopItem } from '../../store/onClick'
import { TopMenuText } from '../../styles/main/topMenuStyle'
import { colorBrown, tabBaseColor } from '../../../assets/colors/color'

export const TopMenuItemTouchable = (props) =>{

    // state
    const dispatch = useDispatch();
    const {topItem} = useSelector((state)=>state.onClick);

    // animation set
    const [animation, setAnimation] = useState(new Animated.Value(0))
    const [heightAnimation, setHeightAnimation] = useState(new Animated.Value(0))
    

    // width interpolation
    const inputRange = [0, 1];
    const outputRange = [0, -5]
    const animatedheight = heightAnimation.interpolate({inputRange, outputRange});
    const boxStyle = {
        transform: [{translateY:animatedheight},],
      };
    // color interpolation
    const boxInterpolation =  animation.interpolate({
        inputRange: [0, 1],
        outputRange:[tabBaseColor, colorBrown]
      })
    const animatedStyle = {
        backgroundColor: boxInterpolation,
        width:142,
        height:52,
        marginRight:7,
        justifyContent: 'flex-end',
        marginTop:33,
        borderTopLeftRadius:RADIUS_DOUBLE,borderTopRightRadius:RADIUS_DOUBLE
        
     }

    const onSelectHandleAnimation = () => {
        dispatch(clickTopItem(props.categoryId))
        Animated.parallel([
            Animated.timing(animation, {
                toValue:1,
                duration: 200,
                useNativeDriver:true,
            }),
            Animated.timing(heightAnimation, {
                toValue: 1,
                duration: 100,
                useNativeDriver:true,
            }), 
        ]).start();   
    }
    const onDeSelectHandleAnimation = () => {
        Animated.parallel([
            Animated.timing(animation, {
                toValue:0,
                duration: 200,
                useNativeDriver:true,
            }),
            Animated.timing(heightAnimation, {
                toValue: 0,
                duration: 100,
                useNativeDriver:true,
            }),
        ]).start();   
    }
    

    useEffect(()=>{
        console.log("topItem: ",topItem);
        if(props.categoryId != topItem) {
            onDeSelectHandleAnimation();
        }
    },[topItem])
    return (
        <TouchableWithoutFeedback onPress={()=>{ onSelectHandleAnimation(); props.onItemPress(); }}>
            <Animated.View style={[{  ...animatedStyle,...boxStyle}]} >
                <TopMenuText>{props.categoryName}</TopMenuText>
            </Animated.View>
        </TouchableWithoutFeedback>

    )
 
}