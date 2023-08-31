import React, { useState, useEffect } from 'react'
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { TopMenuText } from '../../styles/main/topMenuStyle';
import { colorBrown, tabBaseColor } from '../../assets/colors/color';
import { RADIUS_DOUBLE } from '../../styles/values';


const TopMenuList = (props) => {

    const data = props.data;
    //console.log("data: ",data)
    
    const [selectedIndex, setSelectedIndex] = useState(0);

    const colorAnimationArray = [];;
    const heightAnimationArray=[];
    const boxStyleArray = [];
    const animatedColorArray = [];
    for(var i=0;i<data.length;i++) {
        // animation set
        const colorAnimation = (new Animated.Value(0,{useNativeDriver:true}))
        const heightAnimation = (new Animated.Value(0,{useNativeDriver:true}))

        colorAnimationArray.push(colorAnimation);
        heightAnimationArray.push(heightAnimation);

        // height interpolation
        const animatedHeightInterpolate = heightAnimationArray[i].interpolate({
            inputRange:[0, 1], 
            outputRange:[0, -5]
        });
       
        // color interpolation
        const animatedColorInterpolate =  colorAnimation.interpolate({
            inputRange: [0, 1],
            outputRange:[tabBaseColor, colorBrown]
        })

        animatedColorArray.push({
            backgroundColor: animatedColorInterpolate,
            width:142,
            height:52,
            marginRight:7,
            justifyContent: 'flex-end',
            marginTop:33,
        });

        const boxStyle = {
            transform: [{translateY:animatedHeightInterpolate},],
            backgroundColor: animatedColorInterpolate,
            borderTopLeftRadius:RADIUS_DOUBLE,
            borderTopRightRadius:RADIUS_DOUBLE,
        };
        boxStyleArray.push(boxStyle);

    }

    const onSelectHandleAnimation = (index) => {
        Animated.parallel([
            Animated.timing(colorAnimationArray[index], {
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
        props?.onSelectItem(index);

    }
    useEffect(()=>{
        if(selectedIndex!=null) {
            onSelectHandleAnimation(selectedIndex);
        }
    },[selectedIndex])
    onSelectHandleAnimation(0);

    return (
        <>
        {data.map((el, index)=>{
            return(
                <>
                    <TouchableWithoutFeedback onPress={()=>{ handleOnPress(index); }}>
                        <Animated.View style={[{   ...animatedColorArray[index]},{...boxStyleArray[index]}]} >
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