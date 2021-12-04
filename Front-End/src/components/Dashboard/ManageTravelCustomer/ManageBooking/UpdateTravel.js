import {
    Button, Modal
} from 'react-bootstrap';
import { useState } from 'react'
import UpdateSeatForm from './UpdateSeatForm'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Redirect } from 'react-router';
import "./UpdateTravel.css"

const UpdateTravel = (props) => {
    const [show, setShow] = useState(false);
    const [availableSeats, setAvailableSeats] = useState([])
    const [cancelFlag, setCancelFlag] = useState(false)
    const [redirectPage, setRedirectPage] = useState(null)

    const customerID = sessionStorage.getItem('customerId')
    const reservationID = props.individualData._id

    const handleClose = () => setShow(false);

    const handleShow = async () => {
        const res = await axios.get(`http://18.144.101.175:3001/flights/getAvailableSeats/${props.individualData.flightID}`)
        setAvailableSeats(res.data.message[0].seats)
        setShow(true);
    }

    const handleCancelBooking = async () => {

        const data = {
            customerID,
            reservationID
        }

        axios.defaults.withCredentials = true;
        axios.put('http://18.144.101.175:3001/reservations/cancelReservation', data)
            .then((response) => {
                setCancelFlag(true)
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

    const onConfirm = () => {
        setCancelFlag(false)
        setRedirectPage(<Redirect to='/customerdashboard' />)
    }

    return (
        <div>
            {redirectPage}
            {cancelFlag ? <SweetAlert
                success
                title={"Successfully Payed !"}
                onConfirm={onConfirm}
                dependencies={[cancelFlag]}
            ></SweetAlert> : null}
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