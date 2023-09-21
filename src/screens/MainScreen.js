import React, { useEffect, useState } from 'react'
import {View, NativeModules, DeviceEventEmitter} from 'react-native'
import SideMenu from '../components/main/sideMenu'
import TopMenu from '../components/main/topMenu'
import { MainWrapper, WholeWrapper } from '../styles/main/mainStyle'
import CartView from '../components/main/cartView'
import { SCREEN_TIMEOUT } from '../resources/numberValues'
import MenuListView from '../components/main/menuListView'
import ItemDetail from '../components/detailComponents/itemDetail'
import PopUp from '../components/common/popup'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import LogWriter from '../utils/logWriter'


const MainScreen = () =>{
    
    const logWriter = new LogWriter();
    logWriter.writeLog("test");
/* 
    console.log(RNFS.DocumentDirectoryPath);
    var path = RNFS.DocumentDirectoryPath + '/test.txt';
    RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
 */

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
            <WholeWrapper onTouchStart={()=>{ /* screenTimeOut();  */ }} >
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