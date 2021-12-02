import {
    Button, Form, Row, Col
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios';
import { paymentFlightActions } from '../../../../../store/paymentFlightSlice'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Redirect } from 'react-router';

const MileagePointsPayment = (props) => {
    const dispatch = useDispatch()
    const rewardPoints = useSelector(state => state.mainSlice.rewardPoints)

    const [paymentFlag, setPaymentFlag] = useState(false);
    const [redirectPage, setRedirectPage] = useState(null);

    const flightID = props.flight._id
    const customerID = sessionStorage.getItem('customerId')
    const numOfPassengers = useSelector(state => state.searchFlightSlice.numberOfPassengers)
    const passengerList = useSelector(state => state.bookFlightSlice.passengerList)
    const paymentMode = 'mileagePoints'
    const mileagePointsPaid = numOfPassengers * props.flight.mileagePoints


    const onClickBack = () => {
        dispatch(paymentFlightActions.setIsCreditCard(false))
        dispatch(paymentFlightActions.setIsMileagePoints(false))
    }

    const handlePayment = (event) => {
        event.preventDefault()

        const data = {
            flightID,
            customerID,
            numOfPassengers,
            passengerList,
            paymentMode,
            mileagePointsPaid
        }

        console.log(data)

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/reservations', data)
            .then((response) => {
                setPaymentFlag(true)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const onConfirm = () => {
        setPaymentFlag(false)
        setRedirectPage(<Redirect to='/customerdashboard' />)
    }

    return (
        <div>
            {redirectPage}
            {paymentFlag ? <SweetAlert
                success
                title={"Successfully Payed !"}
                onConfirm={onConfirm}
                dependencies={[paymentFlag]}
            ></SweetAlert> : null}
            <Form id="reward-points-form" method="post" onSubmit={handlePayment}>
                <p>Mileage Points Payment</p>
                <Row style={{ marginTop: '10px' }}>
                    <Col><Form.Control type="text" name="rewardPoints" placeholder={`Your Reward Points: ${rewardPoints}`} disabled /></Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col><Form.Control type="text" name="mileagePointsPaid" placeholder={`Mileage Points Charged: ${mileagePointsPaid}`} disabled /></Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col style={{ textAlign: 'center' }}><Button variant="primary" onClick={onClickBack}>Back</Button></Col>
                    <Col style={{ textAlign: 'center' }}><Button id="paybutton" type="submit">Pay</Button></Col>
                </Row>
            </Form>
        </div>
    )
}

export default MileagePointsPayment