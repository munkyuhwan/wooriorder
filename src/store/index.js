import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

//slices
import mainMenu from './menu'
import menuDetail from './menuDetail'
import onClick from './onClick'
import languageSelect from './language'
import popup from './popup'

const reducer = combineReducers({
    mainMenu,
    onClick,
    languageSelect,
    menuDetail,
    popup,
})

const store = configureStore({
    reducer,
})

export default store;
