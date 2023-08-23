import { 
    configureStore, 
    combineReducers,
} from '@reduxjs/toolkit'

//slices
import { cagegoriesSlice } from './categories'
import { languagesSlice } from './languages'
import { menuSlice } from './menu'
import { menuDetailSlice } from './menuDetail'
import { popupsSlice } from './popup'

const store = configureStore({
    reducer:{
        categories:cagegoriesSlice.reducer,
        languages:languagesSlice.reducer,
        menu:menuSlice.reducer,
        menuDetail:menuDetailSlice.reducer,
        popup:popupsSlice.reducer,
    }
})


export default store;
