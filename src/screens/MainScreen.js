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
import { logger, fileAsyncTransport } from "react-native-logs";
import RNFS from "react-native-fs";


const MainScreen = () =>{
    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    const config = {
        severity: "debug",
        transport: fileAsyncTransport,
        transportOptions: {
          FS: RNFS,
          filePath:RNFS.DownloadDirectoryPath,
          /* EXPO:
           * FS: FileSystem,
           */
          fileName: `log.txt`, // Create a new file every day
        },
    }
    var log = logger.createLogger(config);
    log.info("Print this string to a file");
    console.log("writing done");
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