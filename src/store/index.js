import { 
    configureStore, 
    combineReducers,
} from '@reduxjs/toolkit'

//slices
import menuDetail from './menuDetail'
import popup from './popup'
import { cagegoriesSlice } from './categories'
import { languagesSlice } from './languages'
import { menuSlice } from './menu'

const reducer = combineReducers({
    menuDetail,
    popup,
})
const store = configureStore({
    reducer:{
        categories:cagegoriesSlice.reducer,
        languages:languagesSlice.reducer,
        menu:menuSlice.reducer,
    }
})


export default store;
