import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    Image,
    StyleSheet,
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    Dimensions, 
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native'
import { HeaderLogo, HeaderWrapper } from '../../styles/header/header'
import { LogoTop, LogoWrapper, SideBottomButton, SideBottomIcon, SideBottomText, SideBottomWrapper, SideMenuItem, SideMenuItemWrapper, SideMenuScrollView, SideMenuWrapper } from '../../styles/main/sideMenuStyle'
import { SideMenuItemTouchable, SideMenuItemTouchableOff } from '../menuComponents/sideMenuItem'
import _ from "lodash";
import { colorRed, colorWhite } from '../../../assets/colors/color'
import { setPopupVisibility } from '../../store/popup'
const SideMenu = () =>{
    const dispatch = useDispatch();
    const test = [0,1,2,3,4,5,6,7,8,9];
    const [currentSelection, setCurrentSelection] = useState(0);
    return(
        <>
            <SideMenuWrapper>
                <LogoWrapper>
                    <LogoTop source={require("../../../assets/icons/logo.png")}  />
                </LogoWrapper>
                <SideMenuScrollView showsVerticalScrollIndicator={false} >
                    <SideMenuItemWrapper>
                        {
                            test.map((index)=>{  
                                if(index==currentSelection) {
                                    return (
                                        <SideMenuItemTouchable key={"side_"+index} selection={currentSelection} setSelection={setCurrentSelection} index={index} categoryId={"cat"+`${index}`} categoryName={"카테고리"+`${index}`} onItemPress={()=>{  }} />
                                    ) 
                                }else {
                                    return (
                                        <SideMenuItemTouchableOff key={"side_"+index}  selection={currentSelection} setSelection={setCurrentSelection} index={index} categoryId={"cat"+`${index}`} categoryName={"카테고리"+`${index}`} onItemPress={()=>{   }} />
                                    )
                                }
                            })
                        }
                    </SideMenuItemWrapper>
                </SideMenuScrollView>
                <SideBottomWrapper>
                    <TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{ console.log("language select"); dispatch(setPopupVisibility(true));}} >
                            <SideBottomButton borderColor={colorWhite} >
                                <SideBottomText>언어선택</SideBottomText>
                                <SideBottomIcon source={require("../../../assets/icons/korean.png")}  />
                            </SideBottomButton>
                        </TouchableWithoutFeedback>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <SideBottomButton bg={"red"} borderColor={colorRed} >
                            <SideBottomText>직원호출</SideBottomText>
                            <SideBottomIcon source={require("../../../assets/icons/bell_trans.png")}  />
                        </SideBottomButton>
                    </TouchableWithoutFeedback>

                </SideBottomWrapper>
            </SideMenuWrapper>
        </>
    )
}

export default SideMenu