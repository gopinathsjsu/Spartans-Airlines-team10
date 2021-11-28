import PaymentOptions from './PaymentOptions'
import CreditCardPayment from './CreditCardPayment'
import MileagePointsPayment from './MileagePointsPayment'
import {
    Button, Modal,
} from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useSelector } from 'react-redux'

const PaymentModal = (props) => {
    const [show, setShow] = useState(false);
    const isCreditCard = useSelector(state => state.paymentFlightSlice.isCreditCard)
    const isMileagePoints = useSelector(state => state.paymentFlightSlice.isMileagePoints)
    const numberOfPassengers = useSelector(state => state.searchFlightSlice.numberOfPassengers)
    const passengerCount = useSelector(state => state.bookFlightSlice.passengerCount)

    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (passengerCount === Number(numberOfPassengers)) {
            setShow(true);
        } else {
            passengerFieldsIncomplete()
        }
    }

    const passengerFieldsIncomplete = () => toast.error('Please Provide Details Of All Passengers')

    return (
        <div>
            <Toaster />
            <Button variant="primary" onClick={handleShow}>
                Book Flight
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isCreditCard && <CreditCardPayment flight={props.flight} />}
                    {isMileagePoints && <MileagePointsPayment />}
                    {!isCreditCard && !isMileagePoints && <PaymentOptions />}
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

export default PaymentModal