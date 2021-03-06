import {
    Col, Row,
} from 'react-bootstrap';

const TravelHistoryInformation = (props) => {
    const departureDate = new Date(props.individualData.departureDate)
    const arrivalDate = new Date(props.individualData.arrivalDate)

    return (
        <div>
            <Row>
                <Col>Flight Number: {props.individualData.flightNumber}</Col>
            </Row>
            <Row>
                <Col>Origin: {props.individualData.origin}</Col>
                <Col>Destination: {props.individualData.destination}</Col>
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
                <Col>Duration: {props.individualData.duration}</Col>
                <Col>Price: {props.individualData.price}</Col>
            </Row>
        </div>
    )
}

export default TravelHistoryInformation