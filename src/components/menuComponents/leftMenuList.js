import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { colorRed, tabBaseColor } from '../../assets/colors/color';
import { SideMenuItemOff, SideMenuItemWrapper, SideMenuText } from '../../styles/main/sideMenuStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMainCategory } from '../../store/categories';
import { useFocusEffect } from '@react-navigation/native';

const LeftMenuList = (props) => {
    const dispatch = useDispatch();
    const data = props?.data;
    const initSelect = props?.initSelect;
    const [selectIndex, setSelectedIndex] = useState(0);


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
        Animated.parallel([
            Animated.timing(animationArray[index], {
                toValue:animationArray[index]._value==0?1:0,
                duration: 0,
                useNativeDriver:true,
            }),
            Animated.timing(widthAnimationArray[index], {
                toValue: widthAnimationArray[index]._value==0?1:0,
                duration: 0,
                useNativeDriver:true,
            }),
            Animated.timing(radiusAnimationArray[index],{
                toValue: (radiusAnimationArray[index]._value==0?1:0)==1?9:0,
                duration: 0,
                useNativeDriver:true,
            })
        ]).start((succes, fail)=>{
            
        });   
    }

    useEffect(()=>{
        if(selectIndex!=null) {
            props?.onSelectItem(selectIndex);
        }
    },[selectIndex])

    useEffect(()=>{
        setSelectedIndex(initSelect);
        dispatch(setSelectedMainCategory(0)); 
    },[])
    onSelectHandleAnimation(selectIndex);

    const onPressAction = (index) =>{
        dispatch(setSelectedMainCategory(index)); 
        setSelectedIndex(index);
    }

    return(
        <>
            {data?.map((item, index)=>{        
                return(
                    <TouchableWithoutFeedback key={"leftItem_"+index} onPress={()=>{{ onPressAction(index); }}}>
                        <Animated.View 
                            key={"leftItemAni_"+index}
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