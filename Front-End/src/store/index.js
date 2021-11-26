import { configureStore } from '@reduxjs/toolkit'
import { mainSliceReducers } from './mainSlice'
import { searchFlightReducers } from './searchFlightSlice'

const store = configureStore({
    reducer: { mainSlice: mainSliceReducers, searchFlightSlice: searchFlightReducers }
})

export default store;