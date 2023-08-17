import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

//slices
import mainMenu from './menu'
import onClick from './onClick'
import languageSelect from './language'

const reducer = combineReducers({
    mainMenu,
    onClick,
    languageSelect,
})

const store = configureStore({
    reducer,
})

export default store;
