import React, { useEffect, useState } from 'react'
import { 
    Animated,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { ArrowImage, CartFlatList, CartScrollView, CartViewWrapper, Handle, OrderWrapper, PayAmtNumber, PayAmtTitle, PayAmtUnit, PayAmtWrapper, PayBtn, PayIcon, PayTitle, PayWrapper } from '../../styles/main/cartStyle';
import CartListItem from '../cartComponents/cartListItem';
import { startSmartroPay } from '../../utils/smartro';
import { LANGUAGE } from '../../resources/strings';
import { setCartView, setIconClick } from '../../store/cart';
import { IconWrapper } from '../../styles/main/topMenuStyle';
import TopButton from '../menuComponents/topButton';
import { openTransperentPopup } from '../../utils/common';
import { postToPos } from '../../store/order';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isEmpty from 'lodash';

const CartView = () =>{
    const {language} = useSelector(state=>state.languages);

    const dispatch = useDispatch();
    const {isOn} = useSelector((state)=>state.cartView);
    const {orderList, grandTotal, totalItemCnt} = useSelector((state)=>state.order);
    //console.log("orderList: ",orderList);
    const [slideAnimation, setSlideAnimation] = useState(new Animated.Value(0));

    const slideInterpolate = slideAnimation.interpolate({
        inputRange:[0,1],
        outputRange:[314,5]
    })
    const boxStyle = {
        transform: [{translateX:slideInterpolate},],
    };
    
    const drawerController = (isOpen) =>{
        Animated.parallel([
            Animated.timing(slideAnimation,{
                toValue:isOpen?1:0,
                duration:200,
                useNativeDriver:true
            })
        ]).start();
    }

    const addToPos = async () =>{
        const orderNo = await AsyncStorage.getItem("orderNo")
        console.log("orderNo: ",orderNo);
        if(isEmpty(orderNo)) {
            console.log("no orderno");
            //dispatch(postToPos());

        }else {
            console.log("yes orderno");

        }
    }
    useEffect(()=>{
        drawerController(isOn); 
    },[isOn])
  
    return(
        <>  
            <IconWrapper>
                <TopButton onPress={()=>{ openTransperentPopup(dispatch, {innerView:"OrderList", isPopupVisible:true}); }} isSlideMenu={false} lr={"left"} onSource={require("../../assets/icons/orderlist_trans.png")} offSource={require("../../assets/icons/orderlist_grey.png")} />
                <TopButton onPress={()=>{  dispatch(setCartView(!isOn));  }} isSlideMenu={true} lr={"right"} onSource={require("../../assets/icons/cart_trans.png")} offSource={require("../../assets/icons/cart_grey.png")} />
            </IconWrapper>
            <CartViewWrapper style={[{...boxStyle}]} >
                
                <TouchableWithoutFeedback onPress={()=>{   dispatch(setCartView(!isOn));  }}>
                    <Handle>
                        {isOn&&
                            <ArrowImage source={require("assets/icons/close_arrow.png")} />
                        }
                        {!isOn&&
                            <ArrowImage style={{transform:[{scaleX:-1}]}} source={require("assets/icons/close_arrow.png")} />
                        }
                    </Handle>
                </TouchableWithoutFeedback>
                {orderList &&
                    <CartFlatList
                        data={orderList}
                        renderItem={(item )=>{
                            return(
                                <CartListItem {...item} />
                            )
                        }}
                    >
                    </CartFlatList>
                }
                <OrderWrapper>
                    <PayWrapper>
                        <PayAmtWrapper isBordered={true}>
                            <PayAmtTitle>{LANGUAGE[language].cartView.orderAmt}</PayAmtTitle>
                            <PayAmtNumber>{totalItemCnt}</PayAmtNumber>
                            <PayAmtUnit> {LANGUAGE[language].cartView.orderAmtUnit}</PayAmtUnit>
                        </PayAmtWrapper>
                    </PayWrapper>
                    <PayWrapper>
                        <PayAmtWrapper >
                            <PayAmtTitle>{LANGUAGE[language].cartView.totalAmt}</PayAmtTitle>
                            <PayAmtNumber>{grandTotal}</PayAmtNumber>
                            <PayAmtUnit> {LANGUAGE[language].cartView.totalAmtUnit}</PayAmtUnit>
                        </PayAmtWrapper>
                    </PayWrapper>
                    <TouchableWithoutFeedback onPress={()=>{ addToPos(); /* startSmartroPay(); */ }} >
                        <PayBtn>
                            <PayTitle>{LANGUAGE[language].cartView.makeOrder}</PayTitle>
                            <PayIcon source={require("assets/icons/order.png")} />
                        </PayBtn>
                     </TouchableWithoutFeedback>
                </OrderWrapper>
            </CartViewWrapper>  
           
        </>
    )
}
export default CartView;