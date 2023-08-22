import React, { useEffect, useState } from 'react'
import { 
    Animated,
    Easing,
    TouchableWithoutFeedback
} from 'react-native'
import { TouchIcon } from '../../styles/main/topMenuStyle'
import { useDispatch, useSelector } from 'react-redux'
import { clickIcon } from '../../store/onClick'
import { setIconClick } from '../../store/categories'

const TopButton = (props) => {

    const dispatch = useDispatch();
    const {isIconOn} = useSelector((state)=>state.categories);

    const onImage = props.onSource;
    const offImage = props.offSource;
    const isSlideMenu = props.isSlideMenu;

    const [onIconAnimation, setOnIconAnimation] = useState(new Animated.Value(1))
    const [offIconAnimation, setOffIconAnimation] = useState(new Animated.Value(0))

    const onChangeIcon = () =>{
        Animated.parallel([
            Animated.timing(onIconAnimation, {
                toValue:1,
                duration: 200,
                useNativeDriver:true,
            }),
            Animated.timing(offIconAnimation, {
                toValue:0,
                duration: 200,
                useNativeDriver:true,
            })
        ]).start();  
    }
    const offChangeIcon = () =>{
        Animated.parallel([
            Animated.timing(onIconAnimation, {
                toValue:0,
                duration: 200,
                useNativeDriver:true,
            }),
            Animated.timing(offIconAnimation, {
                toValue:1,
                duration: 200,
                useNativeDriver:true,
            })
        ]).start();  
    }
    const onIconClicked = () =>{
        dispatch(setIconClick(!isIconOn))
    }
    useEffect(()=>{
        if(isIconOn==false) {
            onChangeIcon();  
        }else {
            offChangeIcon();  
        }
    },[isIconOn])

    return(
        <>
            {!isIconOn &&
                <TouchableWithoutFeedback onPress={()=>{props.onPress(); if(isSlideMenu){onIconClicked();}  }}>
                    <Animated.Image source={onImage} style={[{opacity:onIconAnimation},{width:48,height:48},props.lrt=="left"?{marginLeft:10}:{marginRight:10}]}  />
                </TouchableWithoutFeedback>
            }
            {isIconOn &&
                <TouchableWithoutFeedback onPress={()=>{props.onPress(); if(isSlideMenu){onIconClicked();}  }}>
                    <Animated.Image source={offImage} style={[{opacity:offIconAnimation},{width:48,height:48},props.lrt=="left"?{marginLeft:10}:{marginRight:10}]}  />
                </TouchableWithoutFeedback>
            }
        </>
    )
}

export default TopButton;
