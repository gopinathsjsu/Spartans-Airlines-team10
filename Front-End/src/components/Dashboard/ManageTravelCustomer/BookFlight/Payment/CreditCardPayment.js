import {
    Button, Col, Form, Row
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { paymentFlightActions } from '../../../../../store/paymentFlightSlice'

const CreditCardPayment = (props) => {
    const dispatch = useDispatch()

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
    const amountPaid = useSelector(state => state.paymentFlightSlice.amountPaid)

    const onClickBack = () => {
        dispatch(paymentFlightActions.setIsCreditCard(false))
        dispatch(paymentFlightActions.setIsMileagePoints(false))
    }

    const onChangeCardNo = (e) => {
        dispatch(paymentFlightActions.setCardNo(e.target.value))
    }

    const onChangeExpiryDate = (e) => {
        dispatch(paymentFlightActions.setExpiryDate(e.target.value))
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

    const onChangeAmountPaid = (e) => {
        dispatch(paymentFlightActions.setAmountPaid(e.target.value))
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
        }

        console.log(data)
    }

    return (
        <div>     
            <Form id="credit-card-form" method="post" onSubmit={handlePayment}>
                <p>Enter your credit card details</p>
                    <Row>
                        <Col><Form.Control type="cardNo" name="text" placeholder="Card Number" onChange={onChangeCardNo} required /></Col>
                    </Row>
                    <Row style={{marginTop:'10px'}}>
                        <Col><Form.Control type="expiryDate" name="text" placeholder="Card Expiry Date" onChange={onChangeExpiryDate} required /></Col>
                        <Col><Form.Control type="cvv" name="text" placeholder="CVV" onChange={onChangeCvv} required /></Col>
                    </Row>
                    <Row style={{marginTop:'10px'}}>
                        <Col><Form.Control type="nameOnCard" name="text" placeholder="Name On The Card" onChange={onChangeNameOnCard} required /></Col>
                        <Col><Form.Control type="billingAddress" name="text" placeholder="Address" onChange={onChangeBillingAddress} required /></Col>
                    </Row>
                    <Row style={{marginTop:'10px'}}><Col><Form.Control type="amountPaid" name="text" placeholder="Payment Amount" onChange={onChangeAmountPaid} required /></Col></Row>
                    <Row style={{marginTop:'10px'}}>
                        <Col style={{textAlign:'center'}}><Button variant="primary" onClick={onClickBack}>Back</Button></Col>
                        <Col style={{textAlign:'center'}}><Button id="paybutton" type="submit">Pay</Button></Col>
                    </Row>
            </Form>
            
        </div>
    )
}

export default CreditCardPayment