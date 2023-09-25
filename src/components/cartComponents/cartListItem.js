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
import { resetAmtOrderList } from '../../store/order';

const CartListItem = (props) => {
    const dispatch = useDispatch();
    const {language} = useSelector(state=>state.languages);

    const index = props?.index;
    const order = props?.item;
    const additiveItemList = order.ADDITIVE_ITEM_LIST;
    //console.log("order ADDITIVE_GROUP_LIST: ",order.ADDITIVE_GROUP_LIST)
    //console.log("order ADDITIVE_ITEM_LIST: ",order.ADDITIVE_ITEM_LIST)
    //console.log("additiveItemList: ",additiveItemList);
    //const menuData = MENU_DATA.menuAll[order.menuIndex];
    //console.log("order: ",order.ITEM_NAME);

    //const optionsInfo = MENU_DATA.options[_.selectedOptions[i]];
    //const recommendInfo = MENU_DATA.menuAll[_.selectedRecommend[i]];

    const calculateAmt = (operand, amt) =>{
        // plus, minus, cancel
        dispatch(resetAmtOrderList({operand,amt,index}))
    }
    return(
        <>
            <CartItemWrapper>
                <CartItemImageTogoWrapper>
                    <CartItemImage source={{uri:order?.imgUrl}} />
                    <TouchableWithoutFeedback onPress={()=>{openPopup(dispatch,{innerView:"TogoPopup", isPopupVisible:true}); }} >
                        <CartItemTogoWrapper>
                            <CartItemTogoText>{LANGUAGE[language].cartView.togo}</CartItemTogoText>
                            <CartItemTogoIcon source={require("assets/icons/togo.png")}  />
                        </CartItemTogoWrapper>
                    </TouchableWithoutFeedback>
                </CartItemImageTogoWrapper>
                
                <CartItemTitlePriceWrapper>
                    <CartItemTitle>{order?.ITEM_NAME}</CartItemTitle>
                    <CartItemOpts>
                        {additiveItemList.length>0 &&
                            additiveItemList.map((el,index)=>{
                                return el.ADDITIVE_NAME+`${index<(additiveItemList.length-1)?", ":""}`;
                            })
                         }
                    </CartItemOpts>
                    <CartItemPrice>{numberWithCommas(order?.ITEM_AMT||0)}원</CartItemPrice>
                    <CartItemAmtWrapper>
                        <TouchableWithoutFeedback  onPress={()=>{calculateAmt("minus",1)}} >
                            <CartItemAmtController>
                                <CartItemAmtControllerImage source={require("assets/icons/minusIcon.png")}  />
                            </CartItemAmtController>
                        </TouchableWithoutFeedback>
                        <CartItemAmtText>{order?.ITEM_CNT}</CartItemAmtText>
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