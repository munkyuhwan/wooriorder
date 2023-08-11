import React, { useEffect, useState } from 'react'
import { 
    Animated,
    Text,
    TouchableWithoutFeedback
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { ArrowImage, CartFlatList, CartScrollView, CartViewWrapper, Handle, OrderWrapper, PayAmtNumber, PayAmtTitle, PayAmtUnit, PayAmtWrapper, PayBtn, PayIcon, PayTitle, PayWrapper } from '../../styles/main/cartStyle';
import { clickIcon } from '../../store/onClick';
import CartListItem from '../cartComponents/cartListItem';
import { startSmartroPay } from '../../utils/smartro';

const CartView = () =>{

    const dispatch = useDispatch();
    const {isIconOn} = useSelector(state=>state.onClick);

    const [slideAnimation, setSlideAnimation] = useState(new Animated.Value(0));

    const slideInterpolate = slideAnimation.interpolate({
        inputRange:[0,1],
        outputRange:[314,5]
    })
    const boxStyle = {
        transform: [{translateX:slideInterpolate},],
    };
    
    useEffect(()=>{
        Animated.parallel([
            Animated.timing(slideAnimation,{
                toValue:isIconOn?1:0,
                duration:200,
                useNativeDriver:true
            })
        ]).start();
    },[isIconOn])
 
  
    return(
        <>  
            <CartViewWrapper style={[{...boxStyle}]} >
                <TouchableWithoutFeedback onPress={()=>{dispatch(clickIcon(!isIconOn))}}>
                    <Handle>
                        {isIconOn&&
                            <ArrowImage source={require("../../../assets/icons/close_arrow.png")} />
                        }
                        {!isIconOn&&
                            <ArrowImage style={{transform:[{scaleX:-1}]}} source={require("../../../assets/icons/close_arrow.png")} />
                        }
                    </Handle>
                </TouchableWithoutFeedback>
                <CartFlatList
                    data={[{},{}]}
                    renderItem={(item )=>{
                        return(
                            <CartListItem {...item} />
                        )
                    }}
                >
                </CartFlatList>
                <OrderWrapper>
                    <PayWrapper>
                        <PayAmtWrapper isBordered={true}>
                            <PayAmtTitle>주문수량</PayAmtTitle>
                            <PayAmtNumber>3</PayAmtNumber>
                            <PayAmtUnit> 개</PayAmtUnit>
                        </PayAmtWrapper>
                    </PayWrapper>
                    <PayWrapper>
                        <PayAmtWrapper >
                            <PayAmtTitle>주문금액</PayAmtTitle>
                            <PayAmtNumber>3,000</PayAmtNumber>
                            <PayAmtUnit> 원</PayAmtUnit>
                        </PayAmtWrapper>
                    </PayWrapper>
                    <TouchableWithoutFeedback onPress={()=>{startSmartroPay();}} >
                        <PayBtn>
                            <PayTitle>주문하기</PayTitle>
                            <PayIcon source={require("../../../assets/icons/order.png")} />
                        </PayBtn>
                     </TouchableWithoutFeedback>
                </OrderWrapper>
            </CartViewWrapper>  
        </>
    )
}
export default CartView;