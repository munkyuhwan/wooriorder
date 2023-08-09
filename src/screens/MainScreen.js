import React, { useState } from 'react'
import { 
    StyleSheet,
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    Dimensions 
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addEditDeleteTodo } from '../store/todos'
import Header from '../components/common/headerComponent'
import SideMenu from '../components/main/sideMenu'
import TopMenu from '../components/main/topMenu'
import { MainWrapper, WholeWrapper } from '../styles/main/mainStyle'
import { mainTheme } from '../../assets/colors/color'
import CartView from '../styles/main/cartView'

const MainScreen = () =>{
    return(
        <>
         <WholeWrapper>
            <SideMenu/>
            <MainWrapper>
                <TopMenu/>
                <View style={{backgroundColor:mainTheme, width:'100%', height:'100%'}} />

            </MainWrapper>
        </WholeWrapper>
        </>
    )
}

export default MainScreen