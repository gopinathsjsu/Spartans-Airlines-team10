import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    departureLocation: '',
    arrivalLocation: '',
    departureDate: new Date().toISOString(),
    numberOfPassengers: '',
}

const searchFlightSlice = createSlice({
    name: 'searchFlightSlice',
    initialState: initialState,
    reducers: {
        setDepartureLocation(state, action) {
            state.departureLocation = action.payload
        },
        setArrivalLocation(state, action) {
            state.arrivalLocation = action.payload
        },
        setDepartureDate(state, action) {
            state.departureDate = action.payload
        },
        setNumberOfPassengers(state, action) {
            state.numberOfPassengers = action.payload
        },
    }
});

export const searchFlightActions = searchFlightSlice.actions;
export const searchFlightReducers = searchFlightSlice.reducer