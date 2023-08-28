import { 
    configureStore, 
    combineReducers,
    getDefaultMiddleware,
} from '@reduxjs/toolkit'

//slices
import { cagegoriesSlice } from './categories'
import { languagesSlice } from './languages'
import { menuSlice } from './menu'
import { menuDetailSlice } from './menuDetail'
import { popupsSlice } from './popup'
import { callServerSlice } from './callServer'

const store = configureStore({
    reducer:{
        categories:cagegoriesSlice.reducer,
        languages:languagesSlice.reducer,
        menu:menuSlice.reducer,
        menuDetail:menuDetailSlice.reducer,
        popup:popupsSlice.reducer,
        callServer:callServerSlice.reducer,
    },
    devTools:true
})


export default store;
