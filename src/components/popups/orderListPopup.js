import React, { useState, useEffect } from 'react'
import { Text, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { OrderListWrapper, OrderListPopupWrapper, OrderListTopSubtitle, OrderListTopTitle, OrdrListTopWrapper, OrderListTableWrapper, OrderListTableColumnNameWrapper, OrderListTableColumnName, OrderListTableList, OrderListTalbleGrandTotal, OrderListTalbleGrandTotalWrapper, OrderListTotalTitle, OrderListTotalAmount } from '../../styles/popup/orderListPopupStyle';
import { PopupBottomButtonBlack, PopupBottomButtonText, PopupBottomButtonWrapper } from '../../styles/common/coreStyle';
import { LANGUAGE } from '../../resources/strings';
import { BottomButton, BottomButtonIcon, BottomButtonText, BottomButtonWrapper } from '../../styles/main/detailStyle';
import { colorBlack, colorRed } from '../../assets/colors/color';
import { openTransperentPopup } from '../../utils/common';
import OrderListItem from '../orderListComponents/orderListItem';
import { getOrderStatus } from '../../store/order';
import AsyncStorage from '@react-native-async-storage/async-storage';


const OrderListPopup = () =>{
    const dispatch = useDispatch();
    const {language} = useSelector(state=>state.languages);
    const {orderStatus} = useSelector(state=>state.order);    
    const [orderTotalAmt, setOrderTotalAmt] = useState(0);
    useEffect(()=>{
        AsyncStorage.getItem("orderResult")
        .then(result =>{
            dispatch(getOrderStatus(result));
        })
        .catch(error=>{

        })
    },[])
 
    useEffect(()=>{
        //console.log("orderStatus: ",orderStatus[0].ITEM_LIST);
        orderStatus[0].ITEM_LIST.map(el=>{
            setOrderTotalAmt(orderTotalAmt+Number(el.SALE_PRICE));
        })
    },[orderStatus])
     
    return(
        <>
            <OrderListPopupWrapper>
                <OrdrListTopWrapper>
                    <OrderListTopTitle>{LANGUAGE[language].orderListPopup.orderListTitle}</OrderListTopTitle>
                    <OrderListTopSubtitle>{LANGUAGE[language].orderListPopup.orderListSubtitle}</OrderListTopSubtitle>
                </OrdrListTopWrapper>
                <OrderListWrapper>
                    <OrderListTableWrapper>
                        <OrderListTableColumnNameWrapper>
                            <OrderListTableColumnName flex={0.8} >{LANGUAGE[language].orderListPopup.tableColName}</OrderListTableColumnName>
                            <OrderListTableColumnName flex={0.2} >{LANGUAGE[language].orderListPopup.tableColAmt}</OrderListTableColumnName>
                            <OrderListTableColumnName flex={0.2} >{LANGUAGE[language].orderListPopup.tableColPrice}</OrderListTableColumnName>
                            <OrderListTableColumnName flex={0.3} >{LANGUAGE[language].orderListPopup.tableColTotal}</OrderListTableColumnName>
                        </OrderListTableColumnNameWrapper>
                        <OrderListTableList
                            data={orderStatus[0].ITEM_LIST}
                            renderItem={(item)=>{return <OrderListItem order={item} />}}
                        />
                    </OrderListTableWrapper>
                    <OrderListTalbleGrandTotalWrapper>
                        <OrderListTotalTitle>총 합계</OrderListTotalTitle>
                        <OrderListTotalAmount>{orderTotalAmt}원</OrderListTotalAmount>
                    </OrderListTalbleGrandTotalWrapper>
                </OrderListWrapper>
                <BottomButtonWrapper>
                        <BottomButton backgroundColor={colorRed} >
                            <BottomButtonText>{LANGUAGE[language].orderListPopup.orderListPay}</BottomButtonText>
                            <BottomButtonIcon source={require("../../assets/icons/card.png")} />
                        </BottomButton>
                    <TouchableWithoutFeedback onPress={()=>{ openTransperentPopup(dispatch, {innerView:"", isPopupVisible:false}); }} >
                        <BottomButton backgroundColor={colorBlack} >
                            <BottomButtonText>{LANGUAGE[language].orderListPopup.orderListCancel}</BottomButtonText>
                            <BottomButtonIcon source={require("../../assets/icons/cancel.png")} />
                        </BottomButton>
                    </TouchableWithoutFeedback>
                </BottomButtonWrapper>
            </OrderListPopupWrapper>
        </>
    )
}

export default OrderListPopup;