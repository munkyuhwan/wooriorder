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
import { LANGUAGE } from '../../resources/strings';
import { setCartView, setIconClick } from '../../store/cart';
import { IconWrapper } from '../../styles/main/topMenuStyle';
import TopButton from '../menuComponents/topButton';
import { openPopup, openTransperentPopup } from '../../utils/common';
import { getOrderStatus, postAddToPos, postToPos } from '../../store/order';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isEmpty from 'lodash';
import { servicePayment } from '../../utils/smartro';
import LogWriter from '../../utils/logWriter';
import { setErrorData } from '../../store/error';
import { checkTableOrder, getOrderByTable } from '../../utils/apis';

const CartView = () =>{
    const lw = new LogWriter();

    const {language} = useSelector(state=>state.languages);

    const dispatch = useDispatch();
    const {isOn} = useSelector((state)=>state.cartView);
    const {orderList, grandTotal, totalItemCnt} = useSelector((state)=>state.order);
    const { tableInfo } = useSelector(state=>state.tableInfo);
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
    //AsyncStorage.removeItem("orderResult")
    //AsyncStorage.getItem("orderResult").then(result=>console.log("Resutl: ",result))
    const addToPos = async () => {
        const paymentResult = {"acquire-info": "0300신한카드사", "additional-device-name": "SIFM", "additional-device-serial": "S522121235", "approval-date": "231026", "approval-no": "37466524", "approval-time": "004108", "business-address": "서울 영등포구 선유로3길 10 하우스디 비즈 706호", "business-name": "주식회사 우리포스", "business-no": "2118806806", "business-owner-name": "김정엽", "business-phone-no": "02  15664551", "card-no": "94119400********", "cat-id": "7109912041", "deal": "approval", "device-auth-info": "####SMT-R231", "device-auth-ver": "1001", "device-name": "SMT-R231", "device-serial": "S522121235", "display-msg": "정상승인거래", "external-name": "SIFM", "external-serial": "S522121235", "issuer-info": "0300마이홈플러스신한", "merchant-no": "0105512446", "persional-id": "01040618432", "receipt-msg": "정상승인거래", "response-code": "00", "service": "payment", "service-result": "0000", "total-amount": 20, "type": "credit", "unique-no": "710610231843", "van-tran-seq": "231026004105"}
        dispatch(postToPos({paymentResult}));
        //lw.writeLog("Teset test test")
    } 

    const doPayment = async () =>{
        // 이전에 주문한 주문 번호가 있는지 확인하기 위함
        let orderResult = await AsyncStorage.getItem("orderResult")
        console.log("orderResult:",orderResult);
        // 테이블이 사용중인지 비교 하기
        const isTableAvailable = await checkTableOrder(dispatch,{tableInfo});
        const hasOrderList = isTableAvailable.hasOrderList;
        const orderNo = isTableAvailable.orderNo;
        // 결제 진행을 하면 안되는 조건
        // 3. 포스에서 받아온 주문번호가 없으면 테이블 비워진거임. 앱에 저장된 주문번호 삭제
        if(orderNo == null) {
            await AsyncStorage.removeItem("orderResult");
            orderResult = await AsyncStorage.getItem("orderResult")
        }
        
        // 1. 저장된 주문번호가 있는데 테이블 주문목록의 주문번호와 일치하지 않을 때, 테이블에 이미 다른테블릿 점유중이란것
        if(orderResult!=null) {
            const orderResultJson = JSON.parse(orderResult);
            if(orderResultJson.ORDERNO != orderNo) {
                console.log("orderResult: ",orderResultJson.ORDERNO,", orderNo: ",orderNo);
                // 저장된 주문번호 삭제
                // 테이블 변경해야함
                //await AsyncStorage.removeItem("orderResult");
                dispatch(setErrorData({errorCode:"XXXX",errorMsg:"테이블이 이미 점유 중입니다.\n테이블을 변경 해 주세요." })); 
                openPopup(dispatch,{innerView:"Error", isPopupVisible:true}); 
                return;
            }
        }
        // 2. 저장된 주문번호가 없는데, 테이블 주문목록이 있을경우. 테이블에 이미 다른테블릿 점유중이란것
        if(orderResult == null) {
            if(hasOrderList) {
                // 테이블 점유중 테이블 변경해야함
                dispatch(setErrorData({errorCode:"XXXX",errorMsg:"테이블이 이미 점유 중입니다.(주문번호없음)\n테이블을 변경 해 주세요." })); 
                openPopup(dispatch,{innerView:"Error", isPopupVisible:true}); 
                return
            }
        }
        
 
        const paymentData = {"deal":"approval","total-amount":grandTotal};
        servicePayment(dispatch, paymentData)
        .then(async(result)=>{
            const logResult = `\nPAYMENT Result==================================\ndata:${JSON.stringify(result)}\n`
            lw.writeLog(logResult);
            const jsonResult=JSON.parse(result);
            //const jsonResult = {"acquire-info": "0300신한카드사", "additional-device-name": "SIFM", "additional-device-serial": "S522121235", "approval-date": "231026", "approval-no": "37466524", "approval-time": "004108", "business-address": "서울 영등포구 선유로3길 10 하우스디 비즈 706호", "business-name": "주식회사 우리포스", "business-no": "2118806806", "business-owner-name": "김정엽", "business-phone-no": "02  15664551", "card-no": "94119400********", "cat-id": "7109912041", "deal": "approval", "device-auth-info": "####SMT-R231", "device-auth-ver": "1001", "device-name": "SMT-R231", "device-serial": "S522121235", "display-msg": "정상승인거래", "external-name": "SIFM", "external-serial": "S522121235", "issuer-info": "0300마이홈플러스신한", "merchant-no": "0105512446", "persional-id": "01040618432", "receipt-msg": "정상승인거래", "response-code": "00", "service": "payment", "service-result": "0000", "total-amount": 20, "type": "credit", "unique-no": "710610231843", "van-tran-seq": "231026004105"}
            if(jsonResult['service-result'] == "0000") {
                // 결제가 완료된 후
                // 1. 주문번호가 저장된게 있으면 
                if(!(orderResult)) {
                    const paymentResult = jsonResult
                    dispatch(postToPos({paymentResult}));
                }else {
                    dispatch(postAddToPos({orderResult}));
                }
                
            }else {
                dispatch(setErrorData({errorCode:"XXXX",errorMsg:jsonResult['service-description']})); 
                openPopup(dispatch,{innerView:"Error", isPopupVisible:true}); 
                // 에러가 발생할 경우 결제 취소해야함.
                const cancelData = {"deal":'cancellation',"total-amount":result['total-amount'],"approval-no":result['approval-no'],"approval-date":result['approval-date']}
                servicePayment(dispatch, cancelData)
                .then((result)=>{
                    const jsonResult=JSON.parse(result);

                })
                .catch((error)=>{
                    console.log("error: ",error)
                })
            }
        })
        .catch((error)=>{
            console.log("error: ",error)
        }); 
        
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
                    <TouchableWithoutFeedback onPress={()=>{ doPayment();  /* addToPos(); */  }} >
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