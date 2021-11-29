import FlightInformation from './FlightInformation'
import { useSelector } from 'react-redux'
import { Accordion, Container } from 'react-bootstrap'

const FlightsDetails = () => {
    let eventKey = 0
    const availableFlights = useSelector(state => state.searchFlightSlice.availableFlights)
    const flights = []
    availableFlights.forEach((flight) => {
        flights.push(<FlightInformation flight={flight} eventKey={eventKey} />)
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