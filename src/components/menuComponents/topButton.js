import React, { useEffect, useState } from 'react'
import { 
    Animated,
    Easing,
    Image,
    TouchableWithoutFeedback
} from 'react-native'
import { TouchIcon } from '../../styles/main/topMenuStyle'
import { useDispatch, useSelector } from 'react-redux'
import { clickIcon } from '../../store/onClick'
import { setCartView } from '../../store/cart'

const TopButton = (props) => {

    const dispatch = useDispatch();
    const {isOn} = useSelector((state)=>state.cartView);

    const onImage = props.onSource;
    const offImage = props.offSource;
    const isSlideMenu = props.isSlideMenu;

    const [onIconAnimation, setOnIconAnimation] = useState(new Animated.Value(1))
    const [offIconAnimation, setOffIconAnimation] = useState(new Animated.Value(0))

    const onChangeIcon = () =>{
        Animated.parallel([
            Animated.timing(onIconAnimation, {
                toValue:1,
                duration: 0,
                useNativeDriver:true,
            }),
            Animated.timing(offIconAnimation, {
                toValue:0,
                duration: 0,
                useNativeDriver:true,
            })
        ]).start();  
    }
    const offChangeIcon = () =>{
        Animated.parallel([
            Animated.timing(onIconAnimation, {
                toValue:0,
                duration: 0,
                useNativeDriver:true,
            }),
            Animated.timing(offIconAnimation, {
                toValue:1,
                duration: 0,
                useNativeDriver:true,
            })
        ]).start();  
    }
    const onIconClicked = () =>{
        dispatch(setCartView(!isOn))
    }
    useEffect(()=>{
        if(isOn==false) {
            onChangeIcon();  
        }else {
            offChangeIcon();  
        }
    },[isOn])

    return(
        <>
            {!isOn &&
                <TouchableWithoutFeedback onPress={()=>{ console.log("on press !isOn"); props.onPress(); if(isSlideMenu){onIconClicked();}  }}>
                    <Image source={onImage} style={[{width:48,height:48},props.lrt=="left"?{marginLeft:10}:{marginRight:10}]}  />
                </TouchableWithoutFeedback>
            }
            {isOn &&
                <TouchableWithoutFeedback onPress={()=>{console.log("on press isOn"); props.onPress(); if(isSlideMenu){onIconClicked();}  }}>
                    <Image source={offImage} style={[{width:48,height:48},props.lrt=="left"?{marginLeft:10}:{marginRight:10}]}  />
                </TouchableWithoutFeedback>
            }
        </>
    )
}

export default TopButton;
