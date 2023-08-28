import React, { useState, useEffect } from 'react'
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components';
import { colorBlack, colorWhite } from '../../assets/colors/color';
import { RADIUS_SMALL } from '../../styles/values';

const SelectItemComponent = (props) =>{

    const data = props?.data;
    const numColumns = props?.numColumns;
    console.log("server item data: ",data);
    return(
        <>
            <SelectItemWrapper>
            <FlatList
                data={data}
                renderItem={({item, index})=>{return(<SelectItem key={index} item={item} /> );}}
                numColumns={4}
                key={({item, index})=>{return "_"+index}}
                keyExtractor={(item,index)=>index}
            />
               
            </SelectItemWrapper>

        </>
    )
}

const SelectItem = () => {
    const [popupZIndex, setPopupZIndex] = useState(0);
    const [size, setSize] = useState("0") 
    // animation set
    const [widthAnimation, setWidthAnimation] = useState(new Animated.Value(0));
    // width interpolation
    const animatedWidthScale = widthAnimation.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [1,1.1,1],
    });
    const animatedWidthTranslate = widthAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0,0],
    });
    
    // height interpolation 
    const animatedHeightScale = widthAnimation.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [1,1.1,1],
    });
    const animatedHeightTranslate = widthAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0,0],
    })

    const boxWidthStyle = {
        transform: [
            {scaleX:animatedWidthScale},
            {translateX:animatedWidthTranslate},
            {scaleY:animatedHeightScale}, 
            {translateY:animatedHeightTranslate}], 
        
   };
    const onSelectHandleAnimation = async (popOpen) => {
        Animated.timing(widthAnimation, {
            toValue:popOpen,
            duration: 200,
            useNativeDriver:true,
        }).start(()=>{
            if(popOpen==0) {
                setPopupZIndex(0)
                setSize('0');
            }
        }) 
    }
    /* 
    useEffect(()=>{
        console.log("open: ",isTransPopupVisible);
        if(isTransPopupVisible) {
            setPopupZIndex(999999);
            setSize('100%');
            onSelectHandleAnimation(2);
        }else {
            onSelectHandleAnimation(0);
        }
    },[isTransPopupVisible])
     */

    return(
        <>
            <Animated.View  style={[{...PopStyle.animatedPop,...boxWidthStyle,...{zIndex:popupZIndex, width:size, height:size}} ]} >   
                <TouchableWithoutFeedback onPress={()=>{ onSelectHandleAnimation(2) } }>
                    <SelectItemContentWrapper>
                        <SelectItemText>test</SelectItemText>
                        <SelectItemChecked source={require("assets/icons/check_black.png")}/>
                    </SelectItemContentWrapper>
                </TouchableWithoutFeedback>
            </Animated.View>
        </>
    )
}

const PopStyle = StyleSheet.create({
    animatedPop:{
        width:227,
        height:70,
    }
});

const SelectItemWrapper = styled.View`
    width:100%;
    height:100%;
    flexDirection:row;
    justifyContents:center;
    alignItems:center;

`
const SelectItemContentWrapper = styled.View`
    width:223px;
    height:70px;
    justifyContents:center;
    backgroundColor:${colorWhite};
    textAlign:center;
    alignItems:center;
    margin:6px;
    borderRadius:${RADIUS_SMALL};
`

const SelectItemText = styled.Text`
    color:${colorBlack};
    backgroundColor:yellow;
    marginTop:auto;
    marginBottom:auto;
`
const SelectItemChecked = styled.Image`
    position:absolute;
    width:18px;
    height:18px;
    right:9px;
    top:8px;
    resizeMode:contain;
`

export default SelectItemComponent;