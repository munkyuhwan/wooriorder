import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OrderListTableItemAmt, OrderListTableItemImage, OrderListTableItemImageNameWrapper, OrderListTableItemName, OrderListTableItemOperander, OrderListTableItemPrice, OrderListTableItemTotal, OrderListTableItemWrapper } from '../../styles/popup/orderListPopupStyle';

const OrderListItem = (props) => {
    const item = props?.order.item;
    console.log("item: ", item)
    return(
        <>
            <OrderListTableItemWrapper>
                <OrderListTableItemImageNameWrapper flex={0.85}>
                    <OrderListTableItemImage source={{uri:item?.imgUrl}} />
                    <OrderListTableItemName>{item?.name}</OrderListTableItemName>
                </OrderListTableItemImageNameWrapper>
                <OrderListTableItemAmt flex={0.1}>{item?.ea}ea</OrderListTableItemAmt>
                <OrderListTableItemOperander flex={0.01} >X</OrderListTableItemOperander>
                <OrderListTableItemPrice flex={0.15} >{item?.price}원</OrderListTableItemPrice>
                <OrderListTableItemOperander flex={0.01} >=</OrderListTableItemOperander>
                <OrderListTableItemTotal flex={0.25} >{item?.ea*item?.price}원</OrderListTableItemTotal>
            </OrderListTableItemWrapper>
        </>
    )
}
export default OrderListItem;