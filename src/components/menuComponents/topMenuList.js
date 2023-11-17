import React, { useState, useEffect, useCallback } from 'react'
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { CategoryDefault, CategorySelected, TopMenuText } from '../../styles/main/topMenuStyle';
import { colorBrown, tabBaseColor } from '../../assets/colors/color';
import { RADIUS_DOUBLE } from '../../styles/values';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSubCategory } from '../../store/categories';
import { useFocusEffect } from '@react-navigation/native';
import { DEFAULT_CATEGORY_ALL_CODE } from '../../resources/defaults';


const TopMenuList = (props) => {
    const dispatch = useDispatch();
    const data = props.data;
    const initSelect = props.initSelect;
    const {selectedMainCategory, selectedSubCategory, subCategories} = useSelector((state)=>state.categories);
    const [selectedCode, setSelectedCode] = useState(DEFAULT_CATEGORY_ALL_CODE);

    useEffect(()=>{
        if(selectedCode!=null) {
            props?.onSelectItem(selectedCode);
        }
    },[selectedCode])

    const onPressAction = (index) =>{
        setSelectedCode(index);
    }

    return (
        <>
        {selectedSubCategory == DEFAULT_CATEGORY_ALL_CODE &&
            <TouchableWithoutFeedback key={"subcat_"} onPress={()=>{}}>
                <CategorySelected>
                    <TopMenuText key={"subcatText_"} >전체</TopMenuText>
                </CategorySelected>
            </TouchableWithoutFeedback>
        }
        {selectedSubCategory != DEFAULT_CATEGORY_ALL_CODE &&
            <TouchableWithoutFeedback key={"subcat_"} onPress={()=>{onPressAction(DEFAULT_CATEGORY_ALL_CODE);}}>
                <CategoryDefault>
                <TopMenuText key={"subcatText_"} >전체</TopMenuText>
                </CategoryDefault>
            </TouchableWithoutFeedback>
        }
        {data &&
        data.map((el, index)=>{
            return(
                <>            
                        {
                        (el?.cate_code2==selectedSubCategory) &&
                            <TouchableWithoutFeedback key={"subcat_"+el?.cate_code2} onPress={()=>{ onPressAction(el?.cate_code2); }}>
                                <CategorySelected>
                                    <TopMenuText key={"subcatText_"+el?.cate_code2} >{el.cate_name2}</TopMenuText>
                                </CategorySelected>
                            </TouchableWithoutFeedback>
                        }
                        {
                        (el?.cate_code2!=selectedSubCategory) &&
                            <TouchableWithoutFeedback key={"subcat_"+el?.cate_code2} onPress={()=>{ onPressAction(el?.cate_code2); }}>
                                <CategoryDefault>
                                    <TopMenuText key={"subcatText_"+el?.cate_code2} >{el.cate_name2}</TopMenuText>
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