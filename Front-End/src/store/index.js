import { configureStore } from '@reduxjs/toolkit'
import { mainSliceReducers } from './mainSlice'
import { searchFlightReducers } from './searchFlightSlice'
import { bookFlightReducers } from './bookFlightSlice'
import { paymentFlightReducers } from './paymentFlightSlice'

const store = configureStore({
    reducer: { mainSlice: mainSliceReducers, searchFlightSlice: searchFlightReducers, bookFlightSlice: bookFlightReducers, paymentFlightSlice: paymentFlightReducers }
})

export default store;