import FlightInformation from './FlightInformation'
import { bookFlightActions } from '../../../../store/bookFlightSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion, Container } from 'react-bootstrap'
import { useEffect } from 'react'

const FlightsDetails = () => {
    const dispatch = useDispatch()
    let eventKey = 0
    const availableFlights = useSelector(state => state.searchFlightSlice.availableFlights)
    const numberOfPassengers = useSelector(state => state.searchFlightSlice.numberOfPassengers)
    
    useEffect(() => {
        dispatch(bookFlightActions.setPassengerList(numberOfPassengers))
    }, [numberOfPassengers, dispatch])

    const flights = []
    availableFlights.forEach((flight) => {
        flights.push(<FlightInformation key={eventKey} flight={flight} eventKey={eventKey} />)
        eventKey += 1
    })

    return (
        <div>
            <Container>
                <div style={{ marginTop: '30px' }}>
                    <h1 style={{ textAlign: 'left' }}>List of Available Flights</h1>
                    <div style={{ marginTop: '20px' }}>
                    <Accordion>
                        {flights}
                    </Accordion>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default FlightsDetails