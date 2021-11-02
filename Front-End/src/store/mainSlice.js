import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    password: '',
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
    }
});

export const mainSliceActions = mainSlice.actions;
export const mainSliceReducers = mainSlice.reducer