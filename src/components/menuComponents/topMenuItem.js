import React, { useState, useRef, useEffect, useCallback } from 'react'

import { Text, Animated, TouchableWithoutFeedback, Easing, View } from 'react-native'
import { RADIUS, RADIUS_DOUBLE } from '../../styles/values'
import { useDispatch, useSelector } from 'react-redux'
import { clickMainItem, clickTopItem } from '../../store/onClick'
import { CategoryDefault, TopMenuText } from '../../styles/main/topMenuStyle'
import { colorBrown, tabBaseColor } from '../../../assets/colors/color'
import { useFocusEffect } from '@react-navigation/native'
import { setSelectedSubCategory } from '../../store/categories'

export const TopMenuItemTouchable = (props) =>{

    // state
    const dispatch = useDispatch();
    const {subCategories, selectedSubCategory} = useSelector((state)=>state.categories);

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

    const onSelectHandleAnimation = (onOff) => {
        Animated.parallel([
            Animated.timing(animation, {
                toValue:onOff,
                duration: 200,
                useNativeDriver:true,
            }),
            Animated.timing(heightAnimation, {
                toValue: onOff,
                duration: 100,
                useNativeDriver:true,
            }), 
        ]).start(()=>{
            props.onItemPress(); 
            if(onOff==1) dispatch(setSelectedSubCategory(props.index))

        });   
    }
    const handleOnPress = () =>{
        onSelectHandleAnimation(1);
    }
    useEffect(()=>{
        if(props.index == selectedSubCategory) onSelectHandleAnimation(1);
    },[])
    return (
        <TouchableWithoutFeedback onPress={()=>{handleOnPress(); }}>
            <Animated.View style={[{  ...animatedStyle,...boxStyle}]} >
                <TopMenuText>{props.categoryName}</TopMenuText>
            </Animated.View>
        </TouchableWithoutFeedback>

    )
 
}

export const TopMenuItemTouchableOff = (props) =>{

    // state
    const dispatch = useDispatch();  
    const handleOnPress = () =>{
        props.onItemPress();
        dispatch(setSelectedSubCategory(props.index));
       
    }
    return (
        <TouchableWithoutFeedback onPress={()=>{ handleOnPress(); }}>
            <CategoryDefault>
                <TopMenuText>{props.categoryName}</TopMenuText>
            </CategoryDefault>
        </TouchableWithoutFeedback>

    )
 
}