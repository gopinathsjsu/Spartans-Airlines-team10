import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    password: '',
    fullname: '',
    emailaddress: '',
    address: '',
    phonenumber: '',
    changepassword: '',
}

const mainSlice = createSlice({
    name: 'mainslice',
    initialState: initialState,
    reducers: {
        setName(state, action) {
            state.name = action.payload
        },
        setEmail(state, action) {
            state.email = action.payload
        },
        setPassword(state, action) {
            state.password = action.payload
        },
        setFullName(state, action) {
            state.fullname = action.payload
        },
        setEmailAddress(state, action) {
            state.emailaddress = action.payload
        },
        setAddress(state, action) {
            state.address = action.payload
        },
        setPhoneNumber(state, action) {
            state.phonenumber = action.payload
        },
        setChangePassword(state, action) {
            state.changepassword = action.payload
        },
    }
});

export const mainSliceActions = mainSlice.actions;
export const mainSliceReducers = mainSlice.reducer