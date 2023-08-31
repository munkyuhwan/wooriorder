import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import MainScreen from '../screens/MainScreen'
import Header from '../components/common/headerComponent'
import PopUp from '../components/common/popup'
import TransparentPopUp from '../components/common/transperntPopup'
import LoginScreen from '../screens/LoginScreen'
import ADScreen from '../screens/ADScreen'
import WaitIndicator from '../components/common/waitIndicator'
import { DeviceEventEmitter, Text, View } from 'react-native'
import PopupIndicator from '../components/common/popupIndicator'
import { useDispatch, useSelector } from 'react-redux'
import { getMainCategories } from '../store/categories'

const Stack = createStackNavigator()

export default function Navigation() {

    const dispatch = useDispatch();
    const {mainCategories, selectedMainCategory} = useSelector((state)=>state.categories);

    const [spinnerText, setSpinnerText] = React.useState("")
    DeviceEventEmitter.addListener("onPending",(ev)=>{
        console.log("ev: ",ev.event )
        const pendingEvent = JSON.parse(ev.event)
        setSpinnerText(pendingEvent?.description)
    })
    DeviceEventEmitter.addListener("onComplete",(ev)=>{
        console.log("onComplete ev: ",ev )
        setSpinnerText("")

    })
    // 메뉴 아이템 받아오기 
    useEffect(()=>{
        dispatch(getMainCategories());
    },[])
    useEffect(()=>{
        console.log("selectedMainCategory:" ,selectedMainCategory);
    },[selectedMainCategory])


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
            {(spinnerText!="")&&
                <PopupIndicator text={spinnerText} />
            }
        </>
    )
}
