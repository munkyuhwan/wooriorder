import React, { useState, useEffect, useCallback } from 'react'
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { CategoryDefault, CategorySelected, TopMenuText } from '../../styles/main/topMenuStyle';
import { colorBrown, tabBaseColor } from '../../assets/colors/color';
import { RADIUS_DOUBLE } from '../../styles/values';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSubCategory } from '../../store/categories';
import { useFocusEffect } from '@react-navigation/native';


const TopMenuList = (props) => {
    const dispatch = useDispatch();
    const data = props.data;
    const initSelect = props.initSelect;
    //console.log("data: ",data)
    const {selectedMainCategory, selectedSubCategory} = useSelector((state)=>state.categories);
    const [selectedIndex, setSelectedIndex] = useState(999);

    useEffect(()=>{
        if(selectedIndex!=null) {
            props?.onSelectItem(selectedIndex);
        }
    },[selectedIndex])

    const onPressAction = (index) =>{
        setSelectedIndex(index);
    }

    return (
        <>
        {data.map((el, index)=>{
            console.log(el);
            return(
                <>
                        {
                        (el?.index==selectedIndex) &&
                            <TouchableWithoutFeedback key={"subcat_"+index} onPress={()=>{ onPressAction(el?.index); }}>
                                <CategorySelected>
                                    <TopMenuText key={"subcatText_"+index} >{el.title}</TopMenuText>
                                </CategorySelected>
                            </TouchableWithoutFeedback>
                        }
                        {
                        (el?.index!=selectedIndex) &&
                            <TouchableWithoutFeedback key={"subcat_"+index} onPress={()=>{ onPressAction(el?.index); }}>
                                <CategoryDefault>
                                    <TopMenuText key={"subcatText_"+index} >{el.title}</TopMenuText>
                                </CategoryDefault>
                            </TouchableWithoutFeedback>
                        }
                        
                </>
            )
        })}
        </>
    )

/* 
    return (
        <>
        {data.map((el, index)=>{
            return(
                <>
                    <TouchableWithoutFeedback key={"subcat_"+index} onPress={()=>{onPressAction(index); }}>
                        <Animated.View key={"subcatAni_"+index}  style={[{   ...animatedColorArray[index]},{...boxStyleArray[index]}]} >
                            <TopMenuText key={"subcatText_"+index} >{el.title}</TopMenuText>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </>
            )
        })}
        </>
    )
     */
}

export default TopMenuList