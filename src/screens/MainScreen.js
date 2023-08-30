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


const MainScreen = () =>{

    return(
        <>
            <WholeWrapper>
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