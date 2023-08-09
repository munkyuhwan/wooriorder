import React, { useEffect, useState } from 'react'
import { 
    Animated,
    TouchableWithoutFeedback
} from 'react-native'
import { CartItemAmtController, CartItemAmtControllerText, CartItemAmtText, CartItemAmtWrapper, CartItemCancelWrapper, CartItemImage, CartItemImageTogoWrapper, CartItemPrice, CartItemTitle, CartItemTitlePriceWrapper, CartItemTogoBtn, CartItemTogoIcon, CartItemTogoText, CartItemTogoWrapper, CartItemWrapper } from '../../styles/main/cartStyle';

const CartListItem = (props) => {
    

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
                        <TouchableWithoutFeedback>
                            <CartItemAmtController>
                                <CartItemAmtControllerText textSize={45} >-</CartItemAmtControllerText>
                            </CartItemAmtController>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback>
                            <CartItemAmtController>
                                <CartItemAmtControllerText>+</CartItemAmtControllerText>
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