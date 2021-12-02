import {
    Col, Row,
} from 'react-bootstrap';
import UpdateTravel from './UpdateTravel'

const TravelInformation = (props) => {
    const departureDate = new Date(props.individualData.flight_info.departureDate)
    const arrivalDate = new Date(props.individualData.flight_info.arrivalDate)

    return (
        <div>
            <Row>
                <Col>Flight Number: {props.individualData.flight_info.flightNumber}</Col>
            </Row>
            <Row>
                <Col>Origin: {props.individualData.flight_info.origin}</Col>
                <Col>Destination: {props.individualData.flight_info.destination}</Col>
            </Row>
            <Row>
                <Col>Departure Date: {departureDate.toLocaleDateString()}</Col>
                <Col>Departure Time: {departureDate.toLocaleTimeString()}</Col>
            </Row>
            <Row>
                <Col>Arrival Date: {arrivalDate.toLocaleDateString()}</Col>
                <Col>Arrival Time: {arrivalDate.toLocaleTimeString()}</Col>
            </Row>
            <Row>
                <Col>Duration: {props.individualData.flight_info.duration}</Col>
                <Col>Price: {props.individualData.flight_info.price}</Col>
            </Row>
            <Row>
                <Col style={{ textAlign: 'center' }}></Col>
                <Col style={{ textAlign: 'right' }}><UpdateTravel individualData={props.individualData} /></Col>
            </Row>
        </div>
    )
}

export default TravelInformation