import { NativeModules } from 'react-native'

export const startSmartroPay = () =>{

    const {SmartroPay} = NativeModules;

    SmartroPay.prepareSmartroPay();


}