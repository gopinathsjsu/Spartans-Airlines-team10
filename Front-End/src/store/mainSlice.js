import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstname: '',
    lastname: '',
    address: '',
    phonenumber: '',
    gender: '',
    dob: new Date().toISOString(),
    email: '',
    password: '',
	
	flightnumber: '',	
    carrier:'',
    origin: '',
    origincode: '',
    destination: '',	
    destinationcode: '',	
    depdate: '',
    depmonth:'',
    arrdate:'',
    arrmonth:'',
    depyear:'',
    dephrs:'',
    depmins:'',
    arrhrs:'',
    arrmins:'',
    arryear:'',	
    price: '',
    capacity: '',
    mileagepoints: '',	
    traveldistance: '',


    flightid: '',
    rewardPoints: '',
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
        setAddress(state, action) {
            state.address = action.payload
        },
        setPhoneNumber(state, action) {
            state.phonenumber = action.payload
        },
        setGender(state, action) {
            state.gender = action.payload
        },
        setDob(state, action) {
            state.dob = action.payload
        },
        setEmail(state, action) {
            state.email = action.payload
        },
        setPassword(state, action) {
            state.password = action.payload
        },
		setFlightNumber(state, action){state.flightnumber= action.payload},
        setCarrier(state,action){
            console.log("Setting carrier");
            console.log(state.carrier);
        state.carrier= action.payload},
        setOrigin(state, action){state.origin= action.payload},
        setOriginCode(state, action){state.origincode= action.payload},
        setDestination(state, action){state.destination= action.payload},
        setDestinationCode(state, action){state.destinationcode= action.payload},
        
        setdepDate(state, action){state.depdate= action.payload},
        setdepMonth(state, action){state.depmonth= action.payload},
        setarrDate(state, action){state.arrdate= action.payload},
        setarrMonth(state, action){state.arrmonth= action.payload},
        setdepYear(state, action){state.depyear= action.payload},
        setdepHrs(state, action){state.dephrs= action.payload},
        setdepMins(state, action){state.depmins= action.payload},
        setarrHrs(state, action){state.arrhrs= action.payload},
        setarrMins(state, action){state.arrmins= action.payload},
        setarrYear(state, action){state.arryear= action.payload},

        setCapacity(state, action){state.capacity= action.payload},
        //setSeatsLeft(state, action){state.seatsleft= action.payload},
        setTravelDistance(state, action){state.traveldistance= action.payload},
        //setDuration(state, action){state.duration= action.payload},
        setMileagePoints(state, action){state.mileagepoints= action.payload},
        //setSeats(state, action){state.seats= action.payload},
        setPrice(state, action){state.price= action.payload},

        setFlightId(state, action){state.flightid= action.payload},
        setRewardPoints(state, action) {
            state.rewardPoints= action.payload
        },
    }
});

export const mainSliceActions = mainSlice.actions;
export const mainSliceReducers = mainSlice.reducer