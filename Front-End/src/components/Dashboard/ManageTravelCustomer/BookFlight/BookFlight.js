import Navigationbar from '../../../Navigationbar/Navigationbar'
import FlightsDetails from './FlightsDetails'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { searchFlightActions } from '../../../../store/searchFlightSlice'
import { bookFlightActions } from '../../../../store/bookFlightSlice'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';

const BookFlight = () => {
    const dispatch = useDispatch()
    const [errorFlag, setErrorFlag] = useState(false)

    const loadedCookie = cookie.load('cookie')

    const originCode = useSelector(state => state.searchFlightSlice.departureLocation)
    const destinationCode = useSelector(state => state.searchFlightSlice.arrivalLocation)
    const departureDate = useSelector(state => state.searchFlightSlice.departureDate)
    const numOfSeats = useSelector(state => state.searchFlightSlice.numberOfPassengers)

    const addedPassengerFlag = useSelector(state => state.bookFlightSlice.addedPassengerFlag)
    const bookFlightFlag = useSelector(state => state.bookFlightSlice.bookFlightFlag)

    useEffect(() => {
        console.log('Click')
        getFlightDetails()
    })

    const getFlightDetails = async () => {
        const passengerAdded = () => toast.success('Passenger Added Succesfully')

        if (addedPassengerFlag) {
            passengerAdded()
            dispatch(bookFlightActions.setAddedPassengerFlag(false))
        }

        const passengerFieldsIncomplete = () => toast.error('Please Provide Details Of All Passengers')

        if (bookFlightFlag) {
            passengerFieldsIncomplete()
            dispatch(bookFlightActions.setBookFlightFlag(false))
        }
        
        try {
            const res = await axios.get(`http://airline-931057547.us-west-1.elb.amazonaws.com:3001/flights`, { params: { originCode, destinationCode, departureDate, numOfSeats } })
            dispatch(searchFlightActions.setAvailableFlights(res.data))
        } catch {
            setErrorFlag(true)
        }
    }



    return (
        <div>
            {!loadedCookie ? <Redirect to="/" /> : null}
            <Toaster />
            <Navigationbar />
            {errorFlag && <h1>Flights Not Found</h1>}
            {!errorFlag && <FlightsDetails />}
        </div>
    )
}

export default BookFlight