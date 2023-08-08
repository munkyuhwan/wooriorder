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

const MainScreen = () =>{
    return(
        <>
         <View>
            <SideMenu/>
        </View>
        </>
    )
}

export default MainScreen