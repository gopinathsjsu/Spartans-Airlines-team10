import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isCreditCard: false,
    isMileagePoints: false,
}

const paymentFlightSlice = createSlice({
    name: 'paymentFlightSlice',
    initialState: initialState,
    reducers: {
        setIsCreditCard(state, action) {
            state.isCreditCard = action.payload
        },
        setIsMileagePoints(state, action) {
            state.isMileagePoints = action.payload
        },
    }
});

export const paymentFlightActions = paymentFlightSlice.actions;
export const paymentFlightReducers = paymentFlightSlice.reducer