import { configureStore } from '@reduxjs/toolkit'
import { mainSliceReducers } from './mainSlice'
import { searchFlightReducers } from './searchFlightSlice'
import { bookFlightReducers } from './bookFlightSlice'

const store = configureStore({
    reducer: { mainSlice: mainSliceReducers, searchFlightSlice: searchFlightReducers, bookFlightSlice: bookFlightReducers}
})

export default store;