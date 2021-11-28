import {
    Button
} from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { paymentFlightActions } from '../../../../../store/paymentFlightSlice'

const CreditCardPayment = () => {
    const dispatch = useDispatch()

    const onClickBack = () => {
        dispatch(paymentFlightActions.setIsCreditCard(false))
        dispatch(paymentFlightActions.setIsMileagePoints(false))
    }

    return (
        <div>
            <p>Credit Card Payment</p>
            <Button variant="primary" onClick={onClickBack}>
                Back
            </Button>
        </div>
    )
}

export default CreditCardPayment