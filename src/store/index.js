import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

//slices
import menu from './menu'
import onClick from './onClick'
import languageSelect from './language'

const reducer = combineReducers({
    menu,
    onClick,
    languageSelect,
})

const store = configureStore({
    reducer,
})

export default store;
