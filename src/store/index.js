import { 
    configureStore, 
    combineReducers,
} from '@reduxjs/toolkit'

//slices
import mainMenu from './menu'
import menuDetail from './menuDetail'
import languageSelect from './language'
import popup from './popup'
import { cagegoriesSlice } from './categories'
import { languagesSlice } from './languages'

const reducer = combineReducers({
    mainMenu,
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
        categories:cagegoriesSlice.reducer,
        languages:languagesSlice.reducer,
    }
})


export default store;
