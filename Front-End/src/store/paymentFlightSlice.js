import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isCreditCard: false,
    isMileagePoints: false,
    paymentMode: '',
    cardNo: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: '',
    amountPaid: '',
    mileagePoints: '',
    mileagePointsPaid: '',
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
        setPaymentMode(state, action) {
            state.paymentMode = action.payload
        },
        setCardNo(state, action) {
            state.cardNo = action.payload
        },
        setExpiryDate(state, action) {
            state.expiryDate = action.payload
        },
        setCvv(state, action) {
            state.cvv = action.payload
        },
        setNameOnCard(state, action) {
            state.nameOnCard = action.payload
        },
        setBillingAddress(state, action) {
            state.billingAddress = action.payload
        },
        setAmountPaid(state, action) {
            state.amountPaid = action.payload
        },
        setMileagePoints(state, action) {
            state.mileagePoints = action.payload
        },
        setMileagePointsPaid(state, action) {
            state.mileagePointsPaid = action.payload
        },
    }
});

export const paymentFlightActions = paymentFlightSlice.actions;
export const paymentFlightReducers = paymentFlightSlice.reducer