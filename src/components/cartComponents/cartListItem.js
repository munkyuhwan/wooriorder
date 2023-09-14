import React, { useEffect, useState } from 'react'
import { 
    Animated,
    TouchableWithoutFeedback
} from 'react-native'
import { CartItemAmtController, CartItemAmtControllerImage, CartItemAmtControllerText, CartItemAmtText, CartItemAmtWrapper, CartItemCancelBtn, CartItemCancelWrapper, CartItemImage, CartItemImageTogoWrapper, CartItemOpts, CartItemPrice, CartItemTitle, CartItemTitlePriceWrapper, CartItemTogoBtn, CartItemTogoIcon, CartItemTogoText, CartItemTogoWrapper, CartItemWrapper } from '../../styles/main/cartStyle';
import { setPopupContent, setPopupVisibility } from '../../store/popup';
import { useDispatch, useSelector } from 'react-redux';
import { numberWithCommas, openPopup } from '../../utils/common';
import { MENU_DATA } from '../../resources/menuData';
import { LANGUAGE } from '../../resources/strings';

const CartListItem = (props) => {
    const dispatch = useDispatch();
    const {language} = useSelector(state=>state.languages);
    const order = props.item;
    const options = order.selectedOptions;
    const menuData = MENU_DATA.menuAll[order.menuIndex];

    
    //const optionsInfo = MENU_DATA.options[_.selectedOptions[i]];
    //const recommendInfo = MENU_DATA.menuAll[_.selectedRecommend[i]];

    const calculateAmt = (operator, amt) =>{
        // plus, minus, cancel
        
    }
    return(
        <>
            <CartItemWrapper>
                <CartItemImageTogoWrapper>
                    <CartItemImage source={{uri:menuData.imgUrl}} />
                    <TouchableWithoutFeedback onPress={()=>{openPopup(dispatch,{innerView:"TogoPopup", isPopupVisible:true}); }} >
                        <CartItemTogoWrapper>
                            <CartItemTogoText>{LANGUAGE[language].cartView.togo}</CartItemTogoText>
                            <CartItemTogoIcon source={require("assets/icons/togo.png")}  />
                        </CartItemTogoWrapper>
                    </TouchableWithoutFeedback>
                </CartItemImageTogoWrapper>
                
                <CartItemTitlePriceWrapper>
                    <CartItemTitle>{menuData.title}</CartItemTitle>
                    <CartItemOpts>
                        {options &&
                            options.map((el,index)=>{
                                return MENU_DATA.options[el].title+`${index<(options.length-1)?", ":""}`;
                            })
                        }
                    </CartItemOpts>
                    <CartItemPrice>{numberWithCommas(menuData.price||0)}원</CartItemPrice>
                    <CartItemAmtWrapper>
                        <TouchableWithoutFeedback  onPress={()=>{calculateAmt("minus",1)}} >
                            <CartItemAmtController>
                                <CartItemAmtControllerImage source={require("assets/icons/minusIcon.png")}  />
                            </CartItemAmtController>
                        </TouchableWithoutFeedback>
                        <CartItemAmtText>1</CartItemAmtText>
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