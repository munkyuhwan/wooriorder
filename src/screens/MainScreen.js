import React, { useEffect, useState } from 'react'
import {View, NativeModules} from 'react-native'
import SideMenu from '../components/main/sideMenu'
import TopMenu from '../components/main/topMenu'
import { MainWrapper, WholeWrapper } from '../styles/main/mainStyle'
import CartView from '../components/main/cartView'
import { SCREEN_TIMEOUT } from '../resources/numberValues'
import MenuListView from '../components/main/menuListView'
import ItemDetail from '../components/detailComponents/itemDetail'
import PopUp from '../components/common/popup'
import { useNavigation } from '@react-navigation/native'


const MainScreen = () =>{
    const navigation = useNavigation();
    /* 
    let timeoutSet = null
    function screenTimeOut(){
        if(timeoutSet!=null){clearInterval(timeoutSet);}
            timeoutSet = setInterval(()=>{
            navigation.navigate('ad');
            clearInterval(timeoutSet);
        },SCREEN_TIMEOUT)
    } */


    return(
        <>
            <WholeWrapper onTouchStart={()=>{console.log("on touch screen");  /* screenTimeOut();  */ }} >
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