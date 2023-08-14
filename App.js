
import React from 'react';
import { Button, NativeModule, NativeModules, TouchableOpacity } from 'react-native';
import {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import store from './src/store'
import { Provider } from 'react-redux'
import Navigation from './src/navigation'
 

StatusBar.setHidden(true);

const App =() =>{
    const {ScreenController} = NativeModules;
    ScreenController.keepAwake();
    ScreenController.setBrightness(0.2);
    return (
        <Provider store={store} >
            <Navigation />
        </Provider>
      )
}

/*
const App = () => {
    const {ToastModule, SmartroPay} = NativeModules;

    return (
        <>
            <Text>TEST</Text>
            <TouchableOpacity onPress={()=>{console.log("on press!"); ToastModule.show("hello", ToastModule.SHORT);  }} >
                <Text>Toast</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{console.log("on smartro press!");console.log(SmartroPay.returnResult());  SmartroPay.prepareSmartroPay();  }} >
                <Text>Smartro</Text>
            </TouchableOpacity>
        </>
    )
}
*/

export default App;
