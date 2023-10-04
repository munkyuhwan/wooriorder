import { useDispatch, useSelector } from "react-redux";
import { OptList } from "../../styles/main/detailStyle";
import OptItem from "../detailComponents/optItem";
import RadioGroup from 'react-native-radio-buttons-group';
import { useEffect, useMemo, useState } from "react";
import _ from 'lodash';
import { setMenuOptionSelected } from "../../store/menuDetail";

const OptionSelectPopup = () =>{
    const dispatch = useDispatch();
    const {menuOptionList, menuOptionGroupCode} = useSelector((state)=>state.menuDetail);
    const [optionData, setOptionData] = useState([])
    const radioButtons = useMemo(()=>optionData)
    const [selectedId, setSelectedId] = useState();
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
            console.log("selectedAddtive: ",selectedAddtive)
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
        }
    },[selectedId])
    return(
        <>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={setSelectedId}
                selectedId={selectedId}
            />

        </>
    );
}

export default OptionSelectPopup;

