import { 
    configureStore, 
    combineReducers,
} from '@reduxjs/toolkit'

//slices
import mainMenu from './menu'
import menuDetail from './menuDetail'
import onClick from './onClick'
import languageSelect from './language'
import popup from './popup'
import { cagegoriesSlice } from './categories'

const reducer = combineReducers({
    mainMenu,
    onClick,
    languageSelect,
    menuDetail,
    popup,
})
/* 
const store = configureStore({
    reducer,
})
  */

const store = configureStore({
    reducer:{
        categories:cagegoriesSlice.reducer
    }
})


export default store;
