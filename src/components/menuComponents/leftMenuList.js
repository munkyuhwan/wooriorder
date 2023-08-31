import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { colorRed, tabBaseColor } from '../../assets/colors/color';
import { SideMenuItemOff, SideMenuItemWrapper, SideMenuText } from '../../styles/main/sideMenuStyle';
import { useSelector } from 'react-redux';

const LeftMenuList = (props) => {

    const data = props?.data;
    const {selectedMainCategory} = useSelector((state)=>state.categories);

    const boxStyleArray = [];
    const animationArray = [];
    const widthAnimationArray=[];
    const radiusAnimationArray=[];
    const animatedStyleArray=[];
    for(i=0;i<data.length; i ++) {
        // deActivate animation
        // animation set
        const animation = (new Animated.Value(0,{useNativeDriver:true}));
        const widthAnimation = (new Animated.Value(0,{useNativeDriver:true}));
        const radiusAnimation = (new Animated.Value(0,{useNativeDriver:true}));
        
        animationArray.push(animation);
        widthAnimationArray.push(widthAnimation);
        radiusAnimationArray.push(radiusAnimation);

        // width interpolation
        const inputRange = [0, 1];
        const outputRange = [0, 10]
        const animatedWidth = widthAnimationArray[i].interpolate({inputRange, outputRange});

        const boxInterpolation =  animation.interpolate({
            inputRange: [0, 1],
            outputRange:[tabBaseColor , colorRed]
        })
        animatedStyleArray.push( {
            backgroundColor: boxInterpolation,
            width:190,
            marginLeft:-10,
            marginTop:5,
        })

        const boxStyle = {
            transform: [{translateX:animatedWidth},],
            backgroundColor: boxInterpolation,
            borderBottomRightRadius:radiusAnimation,
            borderTopRightRadius:radiusAnimation
        };
        boxStyleArray.push(boxStyle);
    }
  
    const onSelectHandleAnimation = async (index) => {
        console.log("index: ",index,", selectedMainCategory: ",selectedMainCategory);
        Animated.parallel([
            Animated.timing(animationArray[index], {
                toValue:index==selectedMainCategory?1:0,
                duration: 200,
                useNativeDriver:true,
            }),
            Animated.timing(widthAnimationArray[index], {
                toValue: index==selectedMainCategory?1:0,
                duration: 200,
                useNativeDriver:true,
            }),
            Animated.timing(radiusAnimationArray[index],{
                toValue: (index==selectedMainCategory?1:0)==1?9:0,
                duration: 150,
                useNativeDriver:true,
            })
        ]).start(()=>{
        });   
    }

    const handleOnPress = (index) =>{
        props?.onSelectItem(index);
    }
    useEffect(()=>{
        console.log("selectedMainCategory: ",selectedMainCategory);
        if(selectedMainCategory!=null) {
            onSelectHandleAnimation(selectedMainCategory);
        }
    },[selectedMainCategory])
    //onSelectHandleAnimation(0)
    return(
        <>
            {data?.map((item, index)=>{        
                return(
                    <TouchableWithoutFeedback key={"leftItem_"+index} onPress={()=>{{handleOnPress(index);} }}>
                        <Animated.View 
                            style={[
                                {...animatedStyleArray[index] },
                                {...boxStyleArray[index]}
                            ]} 
                        >
                            <SideMenuText>{item?.name}</SideMenuText>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                )
            })}
        </>
    )
}
export default LeftMenuList;