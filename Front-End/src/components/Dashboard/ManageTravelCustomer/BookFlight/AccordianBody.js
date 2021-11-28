import { useSelector } from 'react-redux'
import PassengerInformation from './PassengerInformation'
import PaymentModal from './Payment/PaymentModal'

const AccordianBody = (props) => {

    let numberOfPassengers = useSelector(state => state.searchFlightSlice.numberOfPassengers)
    numberOfPassengers = Number(numberOfPassengers)
    const passengersInput = []

    for (let i = 0; i < numberOfPassengers; i++) {
        passengersInput.push(
            <div key={i}>
                <PassengerInformation index={i} />
            </div>
        )
    }
    return (
        <div>
            {passengersInput}
            <br />
            <PaymentModal flight={props.flight} />
        </div>
    )
}

export default AccordianBody