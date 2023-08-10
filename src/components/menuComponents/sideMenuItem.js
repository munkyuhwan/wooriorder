import React, { useState, useRef, useEffect, useCallback } from 'react'

import { SideMenuItem, SideMenuItemOff, SideMenuItemOn, SideMenuItemWrapper, SideMenuText } from '../../styles/main/sideMenuStyle'
import { Text, Animated, TouchableWithoutFeedback, Easing } from 'react-native'
import { RADIUS, RADIUS_DOUBLE } from '../../styles/values'
import { useDispatch, useSelector } from 'react-redux'
import { clickMainItem } from '../../store/onClick'
import { tabBaseColor, colorRed } from '../../../assets/colors/color'
import { useFocusEffect } from '@react-navigation/native'

export const SideMenuItemTouchable = (props) =>{

    // state
    const dispatch = useDispatch();
    const {mainItemIndex} = useSelector((state)=>state.onClick);

    // animation set
    const animation = useRef(new Animated.Value(0,{useNativeDriver:true})).current;
    const widthAnimation = useRef(new Animated.Value(0,{useNativeDriver:true})).current;
    const radiusAnimation = useRef(new Animated.Value(0,{useNativeDriver:true})).current;

    //const [animation, setAnimation ]= useState(new Animated.Value(0,{useNativeDriver:true}));
    //const [widthAnimation, setWidthAnimation] = useState(new Animated.Value(0,{useNativeDriver:true}));
    //const [radiusAnimation, setRadiusAnimation] = useState(new Animated.Value(0,{useNativeDriver:true}));

    state={
        animation:animation,
        widthAnimation:widthAnimation,
        radiusAnimation:radiusAnimation
    }


 
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

    const onSelectHandleAnimation = async () => {
        Animated.parallel([
            Animated.timing(animation, {
                toValue:1,
                duration: 200,
                useNativeDriver:true,
            }),
            Animated.timing(widthAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver:true,
            }),
            Animated.timing(radiusAnimation,{
                toValue: 9,
                duration: 100,
                useNativeDriver:true,
            })
        ]).start(()=>{
            props.onItemPress();
            dispatch(clickMainItem(props.index)); 
            //props.setSelection(props.index);
        });   
    }
   

   /* 
    useFocusEffect(useCallback(()=>{
        console.log("selection: ",props.selection);
        if(props.selection!=props.index ) {
            onDeSelectHandleAnimation();
        }
    },[props.selection]))
     */
    /* 
    useEffect(()=>{
        console.log("after change : ",mainItemIndex )
        const animateStart = async () => {
            if(props.index == mainItemIndex) {
                //onSelectHandleAnimation();
            }else {
                onDeSelectHandleAnimation();
            }
        }
        animateStart(); 
    },[mainItemIndex])
     */
    const handleOnPress = () =>{
        onSelectHandleAnimation();
    }
    if(props.index == props.selection) onSelectHandleAnimation();
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
    const {mainItemIndex} = useSelector((state)=>state.onClick);

    // animation set
    const animation = useRef(new Animated.Value(1,{useNativeDriver:true})).current;
    const widthAnimation = useRef(new Animated.Value(1,{useNativeDriver:true})).current;
    const radiusAnimation = useRef(new Animated.Value(1,{useNativeDriver:true})).current;

    state={
        animation:animation,
        widthAnimation:widthAnimation,
        radiusAnimation:radiusAnimation
    }

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
        outputRange:[colorRed, tabBaseColor ]
    })
    const animatedStyle = {
        backgroundColor: boxInterpolation,
        width:180,
        marginLeft:-10,
        marginTop:5,
    }
    const onDeSelectHandleAnimation = async () => {
        //console.log("deselect : ",props.index )
        Animated.parallel([
            Animated.timing(animation, {
                toValue:0,
                duration: 100,
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
        ]).start(()=>{
            //dispatch(clickMainItem(props.index)); 
         });   
    }
    
    const handleOnPress = () =>{
        //onSelectHandleAnimation();
            props.onItemPress();
            props.setSelection(props.index);
            //onDeSelectHandleAnimation()
            async () =>{
                dispatch(clickMainItem(props.index)); 
            }
    }
/* 
    return (
        <TouchableWithoutFeedback onPress={()=>{handleOnPress();}}>
            <Animated.View style={[{  ...animatedStyle,...boxStyle}]} >
                <SideMenuText>{props.categoryName}</SideMenuText>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
     */

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