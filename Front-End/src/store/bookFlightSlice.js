import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    flightID: '',
    passengerList: [],
    availableSeats: []
}

const bookFlightSlice = createSlice({
    name: 'bookFlightSlice',
    initialState: initialState,
    reducers: {
        setFlightID(state, action) {
            state.flightID = action.payload
        },
        setAvailableSeats(state, action) {
            state.availableSeats = action.payload
        },
        addPassenger(state, action) {
            state.passengerList.push(action.payload)
        },
    }
});

export const bookFlightActions = bookFlightSlice.actions;
export const bookFlightReducers = bookFlightSlice.reducer