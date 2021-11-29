import Navigationbar from '../../../Navigationbar/Navigationbar'
import FlightsDetails from './FlightsDetails'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { searchFlightActions } from '../../../../store/searchFlightSlice'
import axios from 'axios'

const BookFlight = () => {
    const dispatch = useDispatch()
    const [errorFlag, setErrorFlag] = useState(false)

    const originCode = useSelector(state => state.searchFlightSlice.departureLocation)
    const destinationCode = useSelector(state => state.searchFlightSlice.arrivalLocation)
    const departureDate = useSelector(state => state.searchFlightSlice.departureDate)
    const numOfSeats = useSelector(state => state.searchFlightSlice.numberOfPassengers)

    useEffect(() => {
        getFlightDetails()
    })

    const getFlightDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/flights`, { params: { originCode, destinationCode, departureDate, numOfSeats} })
            dispatch(searchFlightActions.setAvailableFlights(res.data))
        } catch{
            setErrorFlag(true)
        }  
    }

    return (
        <div>
            <Navigationbar />
            {errorFlag && <h1>Flights Not Found</h1>}
            {!errorFlag && <FlightsDetails />}
        </div>
    )
}

export default BookFlight