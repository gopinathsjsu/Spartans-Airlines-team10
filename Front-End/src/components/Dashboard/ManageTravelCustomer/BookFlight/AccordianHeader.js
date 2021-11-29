import {
    Col, Row
} from 'react-bootstrap';

const AccordianHeader = (props) => {
    const departureDate = new Date(props.flight.departureDate)
    const arrivalDate = new Date(props.flight.arrivalDate)

    return (
        <div>
            <Row>
                <Col>Flight Number: {props.flight.flightNumber}</Col>
            </Row>
            <Row>
                <Col>Origin: {props.flight.origin}</Col>
                <Col>Destination: {props.flight.destination}</Col>
            </Row>
            <Row>
                <Col>Departure Date: {departureDate.toLocaleDateString()}</Col>
                <Col>Departure Time: {departureDate.toLocaleTimeString()}</Col>
            </Row>
            <Row>
                <Col>Arrival Date: {arrivalDate.toDateString()}</Col>
                <Col>Arrival Time: {arrivalDate.toLocaleTimeString()}</Col>
            </Row>
            <Row>
                <Col>Duration: {props.flight.duration}</Col>
                <Col>Price: {props.flight.price}</Col>
            </Row>
        </div>
    )
}

export default AccordianHeader