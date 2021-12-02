import {
    Button, Modal
} from 'react-bootstrap';
import { useState } from 'react'
import UpdateSeatForm from './UpdateSeatForm'
import axios from 'axios'
import "./UpdateTravel.css"

const UpdateTravel = (props) => {
    const [show, setShow] = useState(false);
    const [availableSeats, setAvailableSeats] = useState([])

    const customerID = sessionStorage.getItem('customerId')
    const reservationID = props.individualData._id

    const handleClose = () => setShow(false);

    const handleShow = async () => {
        const res = await axios.get(`http://localhost:3001/flights/getAvailableSeats/${props.individualData.flightID}`)
        setAvailableSeats(res.data.message[0].seats)
        setShow(true);
    }

    const handleCancelBooking = async () => {

        const data = {
            customerID,
            reservationID
        }

        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3001/reservations/cancelReservation', data)
            .then((response) => {
                console.log(response)
            })
            .catch(() => {
            })
    }

    const passengerInfos = props.individualData.passengers

    const passengerUpdateInfoForms = passengerInfos.map((passengerInfo) => {
        return (
            <div key={passengerInfo._id}>
                <UpdateSeatForm passengerInfo={passengerInfo} availableSeats={availableSeats} reservationID={reservationID} />
            </div>
        )
    })

    return (
        <div>
            <div><Button variant="primary" onClick={handleShow}>Update</Button> <Button id="paybutton" onClick={handleCancelBooking}>Cancel</Button></div>
            <Modal dialogClassName="updatemodal" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Passenger Seat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {passengerUpdateInfoForms}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default UpdateTravel