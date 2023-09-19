import React, { useCallback, useEffect, useState } from 'react'
import { NavigationContainer, useFocusEffect } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import MainScreen from '../screens/MainScreen'
import Header from '../components/common/headerComponent'
import PopUp from '../components/common/popup'
import TransparentPopUp from '../components/common/transparentPopup'
import LoginScreen from '../screens/LoginScreen'
import ADScreen from '../screens/ADScreen'
import WaitIndicator from '../components/common/waitIndicator'
import { DeviceEventEmitter, Text, View } from 'react-native'
import PopupIndicator from '../components/common/popupIndicator'
import { useDispatch, useSelector } from 'react-redux'
import { getMainCategories, getSubCategories, setSelectedMainCategory, setSelectedSubCategory } from '../store/categories'
import FullSizePopup from '../components/common/fullsizePopup'
import ErrorPopup from '../components/common/errorPopup'
import { getMenuEdit } from '../store/menu'
import _ from 'lodash';
const Stack = createStackNavigator()

export default function Navigation() {

    const dispatch = useDispatch();
    const [spinnerText, setSpinnerText] = React.useState("")

    // 결제진행중 팝업
    DeviceEventEmitter.addListener("onPending",(ev)=>{
        const pendingEvent = JSON.parse(ev.event)
        setSpinnerText(pendingEvent?.description)
    })
    DeviceEventEmitter.addListener("onComplete",(ev)=>{
        setSpinnerText("")
    })
    
    useEffect(()=>{
        dispatch(getMenuEdit());
    },[])
    return (
        <>  
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='main'
                    screenOptions={{
                        gestureEnabled: true,
                        headerShown: false,
                    }}
                >
                    <Stack.Screen
                        name='main'
                        component={MainScreen}
                        options={{title:"Main Screen"}}
                    />
                    <Stack.Screen
                        name='login'
                        component={LoginScreen}
                        options={{title:"Login screen"}}
                    />
                    <Stack.Screen
                        name='ad'
                        component={ADScreen}
                        options={{title:"Login screen"}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            <PopUp/>
            <TransparentPopUp/>
            <FullSizePopup/>
            {(spinnerText!="")&&
                <PopupIndicator text={spinnerText} />
            }
        </>
    )
}
