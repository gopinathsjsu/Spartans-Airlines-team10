import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
}

const addFlightSlice = createSlice({
    name: 'addflightslice',
    initialState: initialState,
    reducers: {
        setFlightNumber(state, action){state.flightnumber= action.payload},
        setcarrier(state,action){state.carrier= action.payload},
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

        setFlightId(state, action){state.flightId= action.payload},
    }
});

export const addFlightSliceActions = addFlightSlice.actions;
export const addFlightSliceReducers = addFlightSlice.reducer