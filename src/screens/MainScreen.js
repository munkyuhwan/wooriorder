import React, { useState } from 'react'
import {View, NativeModules} from 'react-native'
import SideMenu from '../components/main/sideMenu'
import TopMenu from '../components/main/topMenu'
import { MainWrapper, WholeWrapper } from '../styles/main/mainStyle'
import { mainTheme } from '../../assets/colors/color'
import CartView from '../components/main/cartView'
import { SCREEN_TIMEOUT } from '../resources/numberValues'
import MenuListView from '../components/main/menuListView'
import ItemDetail from '../components/detailComponents/itemDetail'
import { useSelector } from 'react-redux'
import PopUp from '../components/common/popup'

const MainScreen = () =>{

    const {ScreenController} = NativeModules;

    let timeoutSet = null
    setBrightness(0.7)

    function setBrightness (brightness) {
        ScreenController.keepAwake();
        ScreenController.setBrightness(brightness);    
    }

    function screenTimeOut(){
        if(timeoutSet!=null){clearInterval(timeoutSet);}
        timeoutSet =  setInterval(()=>{
            setBrightness(0.2)
            clearInterval(timeoutSet);
        },SCREEN_TIMEOUT)
    }

    return(
        <>
            <WholeWrapper onTouchStart={()=>{/*  setBrightness(0.7); screenTimeOut();  */}} >
                <SideMenu/>
                <MainWrapper>
                    <TopMenu/>
                    <MenuListView/>
                    <CartView/>
                </MainWrapper>
            </WholeWrapper>
        </>
    )
}

export default MainScreen