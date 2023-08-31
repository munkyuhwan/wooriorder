import React, { useState, useEffect } from 'react'
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { TopMenuText } from '../../styles/main/topMenuStyle';
import { colorBrown, tabBaseColor } from '../../assets/colors/color';
import { RADIUS_DOUBLE } from '../../styles/values';


const TopMenuList = (props) => {

    const data = props.data;
    console.log("data: ",data)
    
    const [selectedIndex, setSelectedIndex] = useState(0);

    const animationArray = [];;
    const heightAnimationArray=[];
    const boxStyleArray = [];
    for(var i=0;i<data.length;i++) {
        // animation set
        const animation = (new Animated.Value(0))
        const heightAnimation = (new Animated.Value(0))

        animationArray.push(animation);
        heightAnimationArray.push(heightAnimation);

        // width interpolation
        const inputRange = [0, 1];
        const outputRange = [0, -5]
        const animatedheight = heightAnimationArray[i].interpolate({inputRange, outputRange});
       
        // color interpolation
        const boxInterpolation =  animationArray[i].interpolate({
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

        const boxStyle = {
            transform: [{translateY:animatedheight},],
            ...animatedStyle
        };
        boxStyleArray.push(boxStyle)

    }

    const onSelectHandleAnimation = (index) => {
        Animated.parallel([
            Animated.timing(animationArray[index], {
                toValue:index==selectedIndex?1:0,
                duration: 200,
                useNativeDriver:true,
            }),
            Animated.timing(heightAnimationArray[index], {
                toValue: index==selectedIndex?1:0,
                duration: 100,
                useNativeDriver:true,
            }), 
        ]).start(()=>{
            //props.onItemPress(); 
            //if(onOff==1) dispatch(setSelectedSubCategory(props.index))

        });   
    } 
    const handleOnPress = (index) =>{
        setSelectedIndex(index)
    }
    useEffect(()=>{
        onSelectHandleAnimation(selectedIndex);
    },selectedIndex)
    return (
        <>
        {data.map((el, index)=>{
            return(
                <>
                    <TouchableWithoutFeedback onPress={()=>{handleOnPress(index); }}>
                        <Animated.View style={[{  ...animationArray[i],...boxStyleArray[index]}]} >
                            <TopMenuText>{el.name}</TopMenuText>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </>
            )
        })}
        </>
    )
}

export default TopMenuList