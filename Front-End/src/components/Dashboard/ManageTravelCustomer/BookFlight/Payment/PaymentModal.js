import PaymentOptions from './PaymentOptions'
import CreditCardPayment from './CreditCardPayment'
import MileagePointsPayment from './MileagePointsPayment'
import {
    Button, Modal,
} from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux'

const PaymentModal = (props) => {
    const [show, setShow] = useState(false);
    const isCreditCard = useSelector(state => state.paymentFlightSlice.isCreditCard)
    const isMileagePoints = useSelector(state => state.paymentFlightSlice.isMileagePoints)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Book Flight
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment Mode</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isCreditCard && <CreditCardPayment />}
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