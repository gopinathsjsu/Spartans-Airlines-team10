import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    phonenumber: '',
    gender: '',
}

const mainSlice = createSlice({
    name: 'mainslice',
    initialState: initialState,
    reducers: {
        setFirstName(state, action) {
            state.firstname = action.payload
        },
        setLastName(state, action) {
            state.lastname = action.payload
        },
        setEmail(state, action) {
            state.email = action.payload
        },
        setPassword(state, action) {
            state.password = action.payload
        },
        setAddress(state, action) {
            state.address = action.payload
        },
        setPhoneNumber(state, action) {
            state.phonenumber = action.payload
        },
        setGender(state, action) {
            state.gender = action.payload
        }
    }
});

export const mainSliceActions = mainSlice.actions;
export const mainSliceReducers = mainSlice.reducer