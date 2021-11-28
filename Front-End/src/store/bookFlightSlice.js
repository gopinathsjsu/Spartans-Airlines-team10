import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    flightID: '',
    passengerList: [],
    passengerCount: 0,
    availableSeats: [],
    addedPassengerFlag: false,
    bookFlightFlag: false
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
            const index = action.payload.index
            state.passengerList[index] = action.payload.passengerInformation
        },
        incrementPassengerCount(state) {
            state.passengerCount += 1
        },
        resetPassengerCount(state) {
            state.passengerCount = 0
        },
        setPassengerList(state, action) {
            const numberOfPassengers = action.payload
            state.passengerList = []
            for (let i = 0; i < numberOfPassengers; i++) {
                state.passengerList.push('')
            }
        },
        setAddedPassengerFlag(state, action) {
            state.addedPassengerFlag = action.payload
        },
        setBookFlightFlag(state, action) {
            state.bookFlightFlag = action.payload
        },
    }
});

export const bookFlightActions = bookFlightSlice.actions;
export const bookFlightReducers = bookFlightSlice.reducer