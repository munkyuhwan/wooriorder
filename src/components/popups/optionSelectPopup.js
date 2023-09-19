import { useDispatch, useSelector } from "react-redux";
import { OptList } from "../../styles/main/detailStyle";
import OptItem from "../detailComponents/optItem";
import RadioGroup from 'react-native-radio-buttons-group';
import { useEffect, useMemo, useState } from "react";
import _ from 'lodash';
import { setMenuOptionSelected } from "../../store/menuDetail";

const OptionSelectPopup = () =>{
    const dispatch = useDispatch();
    const {menuOptionList} = useSelector((state)=>state.menuDetail);
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
            //console.log("menuOptionList: ",menuOptionList);
            dispatch(setMenuOptionSelected(selectedId));
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

