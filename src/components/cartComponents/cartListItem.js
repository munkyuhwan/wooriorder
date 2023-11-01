import React, { useEffect, useState } from 'react'
import { 
    Animated,
    TouchableWithoutFeedback
} from 'react-native'
import { CartItemAmtController, CartItemAmtControllerImage, CartItemAmtControllerText, CartItemAmtText, CartItemAmtWrapper, CartItemCancelBtn, CartItemCancelWrapper, CartItemFastImage, CartItemImage, CartItemImageTogoWrapper, CartItemOpts, CartItemPrice, CartItemTitle, CartItemTitlePriceWrapper, CartItemTogoBtn, CartItemTogoIcon, CartItemTogoText, CartItemTogoWrapper, CartItemWrapper } from '../../styles/main/cartStyle';
import { setPopupContent, setPopupVisibility } from '../../store/popup';
import { useDispatch, useSelector } from 'react-redux';
import { numberWithCommas, openPopup } from '../../utils/common';
import { MENU_DATA } from '../../resources/menuData';
import { LANGUAGE } from '../../resources/strings';
import { resetAmtOrderList } from '../../store/order';

const CartListItem = (props) => {
    const dispatch = useDispatch();
    const {language} = useSelector(state=>state.languages);
    const {menuExtra} = useSelector(state=>state.menuExtra);
  
   
    const index = props?.index;
    const order = props?.item;
    const additiveItemList = order.ADDITIVE_ITEM_LIST;
    
    // 이미지 찾기
    const itemExtra = menuExtra.filter(el=>el.pos_code == order.ITEM_ID);
    console.log("itemExtra:",itemExtra[0]?.gimg_chg);
    const calculateAmt = (operand, amt) =>{
        // plus, minus, cancel
        dispatch(resetAmtOrderList({operand,amt,index}))
    }
    
    return(
        <>
            <CartItemWrapper>
                <CartItemImageTogoWrapper>
                    <CartItemFastImage source={{uri:"http:"+itemExtra[0]?.gimg_chg}} />
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
                                return el.menuOptionSelected.ADDITIVE_NAME+`${index<(additiveItemList.length-1)?", ":""}`;
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