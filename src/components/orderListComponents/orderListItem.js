import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OrderListTableItemAmt, OrderListTableItemImage, OrderListTableItemImageNameWrapper, OrderListTableItemName, OrderListTableItemOperander, OrderListTableItemPrice, OrderListTableItemTotal, OrderListTableItemWrapper } from '../../styles/popup/orderListPopupStyle';

const OrderListItem = (props) => {
    const item = props?.order.item;
    const {menuExtra} = useSelector(state=>state.menuExtra);
  
    // 이미지 찾기
    const itemExtra = menuExtra.filter(el=>el.pos_code == item.ITEM_ID);
    const imgUrl = "https:"+itemExtra[0]?.gimg_chg;

    return(
        <>
            <OrderListTableItemWrapper>
                <OrderListTableItemImageNameWrapper flex={0.85}>
                    <OrderListTableItemImage source={{uri:imgUrl}} />
                    <OrderListTableItemName>{item?.ITEM_NAME}</OrderListTableItemName>
                </OrderListTableItemImageNameWrapper>
                <OrderListTableItemAmt flex={0.1}>{item?.ITEM_CNT}ea</OrderListTableItemAmt>
                <OrderListTableItemOperander flex={0.01} >X</OrderListTableItemOperander>
                <OrderListTableItemPrice flex={0.15} >{item?.SALE_PRICE}원</OrderListTableItemPrice>
                <OrderListTableItemOperander flex={0.01} >=</OrderListTableItemOperander>
                <OrderListTableItemTotal flex={0.25} >{item?.ITEM_CNT*item?.SALE_PRICE}원</OrderListTableItemTotal>
            </OrderListTableItemWrapper>
        </>
    )
}
export default OrderListItem;