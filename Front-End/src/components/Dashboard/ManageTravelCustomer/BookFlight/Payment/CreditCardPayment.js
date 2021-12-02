import {
    Button, Col, Form, Row
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import DatePicker from "react-datepicker";
import { paymentFlightActions } from '../../../../../store/paymentFlightSlice'
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Redirect } from 'react-router';
import "react-datepicker/dist/react-datepicker.css";

const CreditCardPayment = (props) => {
    const dispatch = useDispatch()

    const [paymentFlag, setPaymentFlag] = useState(false);
    const [redirectPage, setRedirectPage] = useState(null);

    const flightID = props.flight._id
    const customerID = sessionStorage.getItem('customerId')
    const numOfPassengers = useSelector(state => state.searchFlightSlice.numberOfPassengers)
    const passengerList = useSelector(state => state.bookFlightSlice.passengerList)
    const paymentMode = 'creditCard'
    const cardNo = useSelector(state => state.paymentFlightSlice.cardNo)
    const expiryDate = useSelector(state => state.paymentFlightSlice.expiryDate)
    const cvv = useSelector(state => state.paymentFlightSlice.cvv)
    const nameOnCard = useSelector(state => state.paymentFlightSlice.nameOnCard)
    const billingAddress = useSelector(state => state.paymentFlightSlice.billingAddress)
    const amountPaid = numOfPassengers * props.flight.price
    const mileagePointsPaid = 0

    const onClickBack = () => {
        dispatch(paymentFlightActions.setIsCreditCard(false))
        dispatch(paymentFlightActions.setIsMileagePoints(false))
    }

    const onChangeCardNo = (e) => {
        dispatch(paymentFlightActions.setCardNo(e.target.value))
    }

    const onChangeExpiryDate = (e) => {
        dispatch(paymentFlightActions.setExpiryDate(e.toISOString()))
    }

    const onChangeCvv = (e) => {
        dispatch(paymentFlightActions.setCvv(e.target.value))
    }

    const onChangeNameOnCard = (e) => {
        dispatch(paymentFlightActions.setNameOnCard(e.target.value))
    }

    const onChangeBillingAddress = (e) => {
        dispatch(paymentFlightActions.setBillingAddress(e.target.value))
    }

    const handlePayment = (event) => {
        event.preventDefault()

        const data = {
            flightID,
            customerID,
            numOfPassengers,
            passengerList,
            paymentMode,
            cardNo,
            expiryDate,
            cvv,
            nameOnCard,
            billingAddress,
            amountPaid,
            mileagePointsPaid,
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
            <Form id="credit-card-form" method="post" onSubmit={handlePayment}>
                <p>Enter your credit card details</p>
                <Row>
                    <Col><Form.Control type="text" name="cardNo" placeholder="Card Number" onChange={onChangeCardNo} required /></Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col><Form.Control type="text" name="nameOnCard" placeholder="Name On The Card" onChange={onChangeNameOnCard} required /></Col>
                    <Col><Form.Control type="text" name="billingAddress" placeholder="Address" onChange={onChangeBillingAddress} required /></Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col><Form.Label>Card Expiry Date:</Form.Label></Col>
                    <Col><DatePicker selected={new Date(expiryDate)} onChange={(date) => onChangeExpiryDate(date)} /></Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col><Form.Control type="text" name="cvv" placeholder="CVV" onChange={onChangeCvv} required /></Col>
                    <Col><Form.Control type="text" name="amountPaid" placeholder={`Payment Amount: ${amountPaid}`} disabled /></Col></Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col style={{ textAlign: 'center' }}><Button variant="primary" onClick={onClickBack}>Back</Button></Col>
                    <Col style={{ textAlign: 'center' }}><Button id="paybutton" type="submit">Pay</Button></Col>
                </Row>
            </Form>
        </div>
    )
}

export default CreditCardPayment