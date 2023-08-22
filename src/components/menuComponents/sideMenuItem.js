import React, { useState, useRef, useEffect, useCallback } from 'react'

import { SideMenuItem, SideMenuItemOff, SideMenuItemOn, SideMenuItemWrapper, SideMenuText } from '../../styles/main/sideMenuStyle'
import { Text, Animated, TouchableWithoutFeedback, Easing } from 'react-native'
import { RADIUS, RADIUS_DOUBLE } from '../../styles/values'
import { useDispatch, useSelector } from 'react-redux'
import { clickMainItem } from '../../store/onClick'
import { tabBaseColor, colorRed } from '../../../assets/colors/color'
import { useFocusEffect } from '@react-navigation/native'
import { setSelectedMainCategory } from '../../store/categories'

export const SideMenuItemTouchable = (props) =>{
    // state
    const dispatch = useDispatch();

    // state
    const {selectedMainCategory} = useSelector((state)=>state.categories);


    // animation set
    const animation = useRef(new Animated.Value(0,{useNativeDriver:true})).current;
    const widthAnimation = useRef(new Animated.Value(0,{useNativeDriver:true})).current;
    const radiusAnimation = useRef(new Animated.Value(0,{useNativeDriver:true})).current;
    
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
        outputRange:[tabBaseColor , colorRed]
    })
    const animatedStyle = {
        backgroundColor: boxInterpolation,
        width:190,
        marginLeft:-10,
        marginTop:5,
    }

    const onSelectHandleAnimation = async (onOff) => {
        Animated.parallel([
            Animated.timing(animation, {
                toValue:onOff,
                duration: 200,
                useNativeDriver:true,
            }),
            Animated.timing(widthAnimation, {
                toValue: onOff,
                duration: 200,
                useNativeDriver:true,
            }),
            Animated.timing(radiusAnimation,{
                toValue: onOff==1?9:0,
                duration: 100,
                useNativeDriver:true,
            })
        ]).start(()=>{
            props.onItemPress();
            if(onOff==1) dispatch(setSelectedMainCategory(props.index))
        });   
    }

    const handleOnPress = () =>{
        onSelectHandleAnimation(1);
    }
    if(props.index == selectedMainCategory) onSelectHandleAnimation(1);

    return (
        <TouchableWithoutFeedback onPress={()=>{handleOnPress();}}>
            <Animated.View style={[{  ...animatedStyle,...boxStyle},{borderBottomRightRadius:radiusAnimation,borderTopRightRadius:radiusAnimation}]} >
                <SideMenuText>{props.categoryName}</SideMenuText>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export const SideMenuItemTouchableOff = (props) =>{

    // state
    const dispatch = useDispatch();
    const handleOnPress = () =>{
        //onSelectHandleAnimation();
            props.onItemPress();
            console.log("click ")
            dispatch(setSelectedMainCategory(props.index))
            
    }

    return (
        <TouchableWithoutFeedback onPress={()=>{handleOnPress();}}>
            <SideMenuItemWrapper>
                <SideMenuItemOff>
                    <SideMenuText>{props.categoryName}</SideMenuText>
                </SideMenuItemOff>
            </SideMenuItemWrapper>
        </TouchableWithoutFeedback>
    )
    
} 