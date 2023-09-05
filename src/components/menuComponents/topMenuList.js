import React, { useState, useEffect, useCallback } from 'react'
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { TopMenuText } from '../../styles/main/topMenuStyle';
import { colorBrown, tabBaseColor } from '../../assets/colors/color';
import { RADIUS_DOUBLE } from '../../styles/values';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSubCategory } from '../../store/categories';
import { useFocusEffect } from '@react-navigation/native';


const TopMenuList = (props) => {
    const dispatch = useDispatch();
    const data = props.data;
    const initSelect = props.initSelect;
    //console.log("data: ",data)
    const {selectedMainCategory, selectedSubCategory} = useSelector((state)=>state.categories);
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

    const onSelectHandleAnimation = async (index) => {
        new Promise(function(resolve, reject){
            Animated.parallel([
                Animated.timing(colorAnimationArray[index], {
                    toValue:colorAnimationArray[index]._value==0?1:0,
                    duration: 0,
                    useNativeDriver:true,
                }),
                Animated.timing(heightAnimationArray[index], {
                    toValue: heightAnimationArray[index]._value==0?1:0,
                    duration: 0,
                    useNativeDriver:true,
                }), 
            ]).start(()=>{
                //props.onItemPress(); 
                //if(onOff==1) dispatch(setSelectedSubCategory(props.index))
                //props?.onSelectItem(index);
            });   
        })
        
    } 
    
    useEffect(()=>{
        if(selectedIndex!=null) {
            props?.onSelectItem(selectedIndex);
        }
    },[selectedIndex])

    useEffect(()=>{
        setSelectedIndex(initSelect); 
    },[])
    useFocusEffect(useCallback(()=>{
        onSelectHandleAnimation(0);
        onPressAction(0);
    },[selectedMainCategory]))
    useEffect(()=>{
        onSelectHandleAnimation(selectedSubCategory);
    },[selectedSubCategory])


    const onPressAction = (index) =>{
        dispatch(setSelectedSubCategory(index)); 
        setSelectedIndex(index);
    }

    return (
        <>
        {data.map((el, index)=>{
            return(
                <>
                    <TouchableWithoutFeedback key={"subcat_"+index} onPress={()=>{onPressAction(index); /* dispatch(setSelectedSubCategory(index));  */}}>
                        <Animated.View key={"subcatAni_"+index}  style={[{   ...animatedColorArray[index]},{...boxStyleArray[index]}]} >
                            <TopMenuText key={"subcatText_"+index} >{el.name}</TopMenuText>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </>
            )
        })}
        </>
    )
}

export default TopMenuList