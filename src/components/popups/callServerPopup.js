import React, { useState, useEffect } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { colorDarkGrey, colorGrey, colorRed, colorWhite } from '../../assets/colors/color';
import { TransparentPopupBottomButtonIcon, TransparentPopupBottomButtonText, TransparentPopupBottomButtonWraper, TransparentPopupBottomInnerWrapper, TransparentPopupBottomWrapper, TransparentPopupTopWrapper, TransparentPopupWrapper, TransperentPopupMidWrapper, TransperentPopupTopSubTitle, TransperentPopupTopTitle } from '../../styles/common/popup';
import { LANGUAGE } from '../../resources/strings';
import SelectItemComponent from '../common/selectItemComponent';
import { getCallServerItems, getServiceList, postAdminSerivceList, sendToPos } from '../../store/callServer';
import { getStoreID, openFullSizePopup, openTransperentPopup } from '../../utils/common';
import { getAdminServices } from '../../utils/apis';
import { posErrorHandler } from '../../utils/errorHandler/ErrorHandler';
//import { STORE_ID } from '../../resources/apiResources';

const CallServerPopup = () => {
    const dispatch = useDispatch();
    const {language} = useSelector(state=>state.languages);

    const {callServerItems} = useSelector(state=>state.callServer);
    const {isFullPopupVisible, innerFullView} = useSelector(state=>state.popup);
    const {tableInfo} = useSelector(state=>state.tableInfo);
    const [selectedService, setSelectedService] = useState();

    // 세팅 터치
    const [settingTouch, setSettingTouch] = useState(0);
    const [isStartCounting, setIsStartCounting] = useState(true);

    useEffect(()=>{
        if(isFullPopupVisible==true && innerFullView=="CallServer") {
            console.log("popup up open");
            //dispatch(getCallServerItems());
            dispatch(getServiceList());
        }
    },[isFullPopupVisible, innerFullView])

    useEffect(()=>{
        //console.log("callServerItems : ",callServerItems)
    },[callServerItems])

    const onServiceSelected = (indexArray) =>{
        setSelectedService(indexArray);
    }
    const callServer = async () =>{
        // dispatch(sendServiceToPos(selectedService));
        // 직원 호출하기
        let subjectData = [];
        if(selectedService) {
            if(selectedService?.length > 0) {
                selectedService.map(el=>{
                    const tmpData = callServerItems.filter(item=>item.idx == el);
                    if(tmpData.length > 0){
                        subjectData.push(tmpData[0].subject);
                    }
                })
                const {STORE_ID, SERVICE_ID} = await getStoreID()
                .catch(err=>{
                    posErrorHandler(dispatch, {ERRCODE:"XXXX",MSG:'STORE_ID, SERVICE_ID를 입력 해 주세요.',MSG2:""})
                });;
                const postCallData = {"STORE_ID":STORE_ID, "t_id":tableInfo.TBL_CODE, midx:selectedService, subject:subjectData};
                dispatch(postAdminSerivceList(postCallData));
                openFullSizePopup(dispatch, {innerView:"", isPopupVisible:false});
            }else {
                
            }
        }
       
    } 
    let settingCount=null;
    let countTime = 5;
    const countDown = () =>{
        if(isStartCounting) {
            setIsStartCounting(false);
            settingCount = setInterval(() => {
                if(countTime>0) {
                    countTime = countTime-1;
                }else {
                    countTime = 5
                    clearInterval(settingCount);
                    settingCount=null;
                    setIsStartCounting(true);
                }
            }, 1000);
        }
    }
    const onSettingPress = () => {
        if(settingTouch<5) {
            setSettingTouch(settingTouch+1);
            if(countTime>0) {
                if(settingTouch>=4) {
                    clearInterval(settingCount);
                    settingCount=null;
                    setIsStartCounting(true);
                    setSettingTouch(0);
                    openFullSizePopup(dispatch,{innerFullView:"Setting", isFullPopupVisible:true});
                }
            }
        }else {
            setSettingTouch(0);
        }
    } 

    return(
        <TransparentPopupWrapper>
            <TransparentPopupTopWrapper>
                <TouchableWithoutFeedback onPress={()=>{ countDown(); onSettingPress();} } style={{position:'absolute',  top:0,left:0, zIndex:999999999}}>
                    <View style={{width:100, height:40, backgroundColor:'transparent'}} >
                        <Text style={{color:'transparent'}} >ddd</Text>    
                    </View>
                </TouchableWithoutFeedback>
                <TransperentPopupTopTitle>{LANGUAGE[language]?.serverPopup.callServer}</TransperentPopupTopTitle>
                <TransperentPopupTopSubTitle>{LANGUAGE[language]?.serverPopup.text}</TransperentPopupTopSubTitle>
            </TransparentPopupTopWrapper>     
            <TransperentPopupMidWrapper>
                
                <SelectItemComponent 
                    data={callServerItems}
                    numColumns={4}
                    onServiceSelected={onServiceSelected}
                />
                
            </TransperentPopupMidWrapper>   
            <TransparentPopupBottomWrapper>
                <TransparentPopupBottomInnerWrapper>
                    <TouchableWithoutFeedback onPress={callServer}>
                        <TransparentPopupBottomButtonWraper bgColor={colorRed} >
                            <TransparentPopupBottomButtonText>{LANGUAGE[language]?.serverPopup.callBtnText}</TransparentPopupBottomButtonText>
                            <TransparentPopupBottomButtonIcon source={require("assets/icons/bell_trans.png")} />
                        </TransparentPopupBottomButtonWraper>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{openFullSizePopup(dispatch, {innerView:"", isPopupVisible:false});}}>
                        <TransparentPopupBottomButtonWraper bgColor={colorDarkGrey} >
                            <TransparentPopupBottomButtonText>{LANGUAGE[language]?.serverPopup.closeBtnText}</TransparentPopupBottomButtonText>
                            <TransparentPopupBottomButtonIcon source={require("assets/icons/cancel.png")} />
                        </TransparentPopupBottomButtonWraper>
                    </TouchableWithoutFeedback>
                </TransparentPopupBottomInnerWrapper>
            </TransparentPopupBottomWrapper>   
        </TransparentPopupWrapper>
    )
}
export default CallServerPopup;