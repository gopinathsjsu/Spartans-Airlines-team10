import {
    Col, Row, Button
} from 'react-bootstrap';
import axios from 'axios'
import { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Redirect } from 'react-router';


const CancelFlightInformation = (props) => {
    const departureDate = new Date(props.individualData.departureDate)
    const arrivalDate = new Date(props.individualData.arrivalDate)

    const [deletedFlag, setDeletedFlag] = useState(false)
    const [notDeletedFlag, setNotDeletedFlag] = useState(false)
    const [redirectPage, setRedirectPage] = useState(null)

    const flightID = props.individualData._id

    const handleCancelFlight = async () => {
        axios.defaults.withCredentials = true;
        axios.delete(`http://localhost:3001/employee/cancelFlight/${flightID}`)
            .then((response) => {
                if (response.data.message === "flight deleted") {
                    setDeletedFlag(true)
                } else if (response.data.message === "Flight has active reservations") {
                    setNotDeletedFlag(true)
                }
                console.log(response.data.message)
            })
            .catch(() => {
            })
    }

    const onDeleteConfirm = () => {
        setDeletedFlag(false)
        setRedirectPage(<Redirect to='/employeedashboard' />)
    }

    const onNotDeleteConfirm = () => {
        setNotDeletedFlag(false)
    }

    return (
        <div>
            {redirectPage}
            {deletedFlag ? <SweetAlert
                success
                title={"Successfully Deleted !"}
                onConfirm={onDeleteConfirm}
                dependencies={[deletedFlag]}
            ></SweetAlert> : null}
            {notDeletedFlag ? <SweetAlert
                warning
                title={"Flight Has Active Reservations !"}
                onConfirm={onNotDeleteConfirm}
                dependencies={[notDeletedFlag]}
            ></SweetAlert> : null}
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
            <Row>
                <Col style={{ textAlign: 'center' }}></Col>
                <Col style={{ textAlign: 'right' }}><Button id="paybutton" onClick={handleCancelFlight}>Cancel</Button></Col>
            </Row>
        </div>
    )
}

export default CancelFlightInformation