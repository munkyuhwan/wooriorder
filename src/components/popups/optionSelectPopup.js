import { useDispatch, useSelector } from "react-redux";
import { OptList } from "../../styles/main/detailStyle";
import OptItem from "../detailComponents/optItem";
import RadioGroup from 'react-native-radio-buttons-group';
import { useEffect, useMemo, useState } from "react";
import _ from 'lodash';
import { setMenuOptionSelected } from "../../store/menuDetail";
import FastImage from "react-native-fast-image";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { openPopup } from "../../utils/common";

const OptionSelectPopup = () =>{
    const dispatch = useDispatch();
    const {menuOptionList, menuOptionGroupCode} = useSelector((state)=>state.menuDetail);
    const [optionData, setOptionData] = useState([])
    const radioButtons = useMemo(()=>optionData)
    const [selectedId, setSelectedId] = useState();

    // 메뉴 옵션 선택 추가 정보
    const {optionExtra} = useSelector(state=>state.menuExtra);
    //console.log("optionExtra: ",optionExtra);
    useEffect(()=>{
        let radioData = [];
        if(!_.isEmpty(menuOptionList)){
            menuOptionList.map((el)=>{
                radioData.push({id:el.ADDITIVE_ID, label:el.ADDITIVE_NAME, value:el.ADDITIVE_ID})
            })
        }
        setOptionData(radioData);
    },[menuOptionList])
    useEffect(()=>{
        if(selectedId) { 
            const selectedAddtive = menuOptionList.filter(el=>el.ADDITIVE_ID==selectedId);
            /* {
                "ADDITIVE_ID": "1001",
                "ADDITIVE_NAME": "시원함",
                "RULE_ID": "1000",
                "ADDITIVE_PRICE": "500",
                "ADDITIVE_CNT": "1"
            } */
            const additiveData = {
                "ADDITIVE_ID": selectedId,
                "ADDITIVE_NAME": selectedAddtive[0].ADDITIVE_NAME,
                "RULE_ID": menuOptionGroupCode,
                "ADDITIVE_PRICE": selectedAddtive[0].ADDITIVE_SALE_PRICE,
                "ADDITIVE_CNT": "1"
            }

            dispatch(setMenuOptionSelected(additiveData));
            openPopup(dispatch,{innerView:"", isPopupVisible:false});

        }
    },[selectedId])
    return( 
        <>
            <View style={{ width:'100%', textAlign:'center', alignItems:"center", padding:20}} >
                <View style={{width:'100%', height:100, padding:0, flexDirection:'row', alignItems:'center', textAlign:'center'  }} >
                    {optionData.map((el,index)=>{ 
                        const optionRight = optionExtra.filter(optionEl => optionEl.pos_code == el.id);
                        return(
                            <TouchableWithoutFeedback onPress={()=>{setSelectedId(el.id)}} >
                                <View style={{padding:10}} >
                                        <FastImage style={{width:100, height:100, resizeMode:'contain',  }} source={{uri:`https:${optionRight[0]?.gimg_chg}`}} />
                                        <Text style={{width:'100%', color:'black', fontWeight:'bold', fontSize:17, textAlign:'center'}}  >{menuOptionList[index]?.ADDITIVE_NAME}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                        )
                    })}
                </View>
            </View>
            { /*
            <View style={{ width:'100%', textAlign:'center', alignItems:"center"}} >
                <RadioGroup 
                    containerStyle={el=>{console.log("el: ",el)}}
                    radioButtons={radioButtons} 
                    onPress={setSelectedId}
                    selectedId={selectedId}
                    layout="row"
                />
                </View> 
                */}

        </>
    );
}

export default OptionSelectPopup;

