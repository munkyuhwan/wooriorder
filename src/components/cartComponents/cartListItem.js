import React, { useEffect, useState } from 'react'
import { 
    Animated,
    TouchableWithoutFeedback
} from 'react-native'
import { CartItemAmtController, CartItemAmtControllerImage, CartItemAmtControllerText, CartItemAmtText, CartItemAmtWrapper, CartItemCancelWrapper, CartItemImage, CartItemImageTogoWrapper, CartItemPrice, CartItemTitle, CartItemTitlePriceWrapper, CartItemTogoBtn, CartItemTogoIcon, CartItemTogoText, CartItemTogoWrapper, CartItemWrapper } from '../../styles/main/cartStyle';

const CartListItem = (props) => {
    
    const calculateAmt = (operator, amt) =>{

    }

    return(
        <>
            <CartItemWrapper>
                <CartItemImageTogoWrapper>
                    <CartItemImage/>
                    <CartItemTogoWrapper>
                        <CartItemTogoText>test</CartItemTogoText>
                        <CartItemTogoIcon source={require("../../../assets/icons/togo.png")}  />
                    </CartItemTogoWrapper>
                </CartItemImageTogoWrapper>
                
                <CartItemTitlePriceWrapper>
                    <CartItemTitle>메뉴명명명</CartItemTitle>
                    <CartItemPrice>120202원</CartItemPrice>
                    <CartItemAmtWrapper>
                        <TouchableWithoutFeedback  onPress={()=>{calculateAmt("minus",1)}} >
                            <CartItemAmtController>
                                <CartItemAmtControllerImage source={require("../../../assets/icons/minusIcon.png")}  />
                            </CartItemAmtController>
                        </TouchableWithoutFeedback>
                        <CartItemAmtText>11</CartItemAmtText>
                        <TouchableWithoutFeedback  onPress={()=>{calculateAmt("plus",1)}} >
                            <CartItemAmtController>
                                <CartItemAmtControllerImage  source={require("../../../assets/icons/plusIcon.png")} />
                            </CartItemAmtController>
                        </TouchableWithoutFeedback>
                    </CartItemAmtWrapper>
                </CartItemTitlePriceWrapper>
                <CartItemCancelWrapper>

                </CartItemCancelWrapper>
            </CartItemWrapper>
        </>
    )
}

export default CartListItem;