import {
    Button, Col, Row
} from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { paymentFlightActions } from '../../../../../store/paymentFlightSlice'

const PaymentOptions = () => {
    const dispatch = useDispatch()

    const onClickCreditCard = () => {
        dispatch(paymentFlightActions.setIsCreditCard(true))
        dispatch(paymentFlightActions.setIsMileagePoints(false))
    }

    const onClickMileagePoints = () => {
        dispatch(paymentFlightActions.setIsMileagePoints(true))
        dispatch(paymentFlightActions.setIsCreditCard(false))
    }

    return (
        <div>
            <Row>
                <Col style={{ textAlign: "center" }}>
                    <Button variant="primary" onClick={onClickCreditCard}>
                        Credit Card
                    </Button>
                </Col>
                <Col style={{ textAlign: "center" }}>
                    <Button variant="primary" onClick={onClickMileagePoints}>
                        Mileage Points
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default PaymentOptions