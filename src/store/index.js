import { 
    configureStore, 
    combineReducers,
} from '@reduxjs/toolkit'

//slices
import popup from './popup'
import { cagegoriesSlice } from './categories'
import { languagesSlice } from './languages'
import { menuSlice } from './menu'
import { menuDetailSlice } from './menuDetail'

const reducer = combineReducers({
    popup,
})
const store = configureStore({
    reducer:{
        categories:cagegoriesSlice.reducer,
        languages:languagesSlice.reducer,
        menu:menuSlice.reducer,
        menuDetail:menuDetailSlice.reducer
    }
})


export default store;
