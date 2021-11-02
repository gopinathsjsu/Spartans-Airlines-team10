import { configureStore } from '@reduxjs/toolkit'
import { mainSliceReducers } from './mainSlice'

const store = configureStore({
    reducer: { mainSlice: mainSliceReducers }
})

export default store;