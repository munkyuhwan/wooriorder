import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

//slices
import menu from './menu'
import onClick from './onClick'

const reducer = combineReducers({
    menu,
    onClick,
})

const store = configureStore({
    reducer,
})

export default store;
