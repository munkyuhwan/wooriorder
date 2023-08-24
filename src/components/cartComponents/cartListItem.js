import React, { useEffect, useState } from 'react'
import { 
    Animated,
    TouchableWithoutFeedback
} from 'react-native'
import { CartItemAmtController, CartItemAmtControllerImage, CartItemAmtControllerText, CartItemAmtText, CartItemAmtWrapper, CartItemCancelBtn, CartItemCancelWrapper, CartItemImage, CartItemImageTogoWrapper, CartItemPrice, CartItemTitle, CartItemTitlePriceWrapper, CartItemTogoBtn, CartItemTogoIcon, CartItemTogoText, CartItemTogoWrapper, CartItemWrapper } from '../../styles/main/cartStyle';
import { setPopupVisibility } from '../../store/popup';
import { useDispatch } from 'react-redux';

const CartListItem = (props) => {
    const dispatch = useDispatch();
    const calculateAmt = (operator, amt) =>{
        // plus, minus, cancel
        
    }

    return(
        <>
            <CartItemWrapper>
                <CartItemImageTogoWrapper>
                    <CartItemImage/>
                    <TouchableWithoutFeedback onPress={()=>{dispatch(setPopupVisibility({isOpen:true,popupType:"TogoPopup"}));}} >
                        <CartItemTogoWrapper>
                            <CartItemTogoText>test</CartItemTogoText>
                            <CartItemTogoIcon source={require("assets/icons/togo.png")}  />
                        </CartItemTogoWrapper>
                    </TouchableWithoutFeedback>
                </CartItemImageTogoWrapper>
                
                <CartItemTitlePriceWrapper>
                    <CartItemTitle>메뉴명명명</CartItemTitle>
                    <CartItemPrice>120202원</CartItemPrice>
                    <CartItemAmtWrapper>
                        <TouchableWithoutFeedback  onPress={()=>{calculateAmt("minus",1)}} >
                            <CartItemAmtController>
                                <CartItemAmtControllerImage source={require("assets/icons/minusIcon.png")}  />
                            </CartItemAmtController>
                        </TouchableWithoutFeedback>
                        <CartItemAmtText>11</CartItemAmtText>
                        <TouchableWithoutFeedback  onPress={()=>{calculateAmt("plus",1)}} >
                            <CartItemAmtController>
                                <CartItemAmtControllerImage  source={require("assets/icons/plusIcon.png")} />
                            </CartItemAmtController>
                        </TouchableWithoutFeedback>
                    </CartItemAmtWrapper>
                </CartItemTitlePriceWrapper>
                <TouchableWithoutFeedback onPress={()=>{calculateAmt("cancel",0)}}>
                    <CartItemCancelWrapper>
                        <CartItemCancelBtn source={require("assets/icons/close_grey.png")} />
                    </CartItemCancelWrapper>
                </TouchableWithoutFeedback>

            </CartItemWrapper>
        </>
    )
}

export default CartListItem;