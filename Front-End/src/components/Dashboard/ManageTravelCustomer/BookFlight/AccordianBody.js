import { useSelector } from 'react-redux'
import PassengerInformation from './PassengerInformation'


const AccordianBody = () => {

    let numberOfPassengers = useSelector(state => state.searchFlightSlice.numberOfPassengers)
    numberOfPassengers = Number(numberOfPassengers)
    const passengersInput = []

    for (let i = 0; i < numberOfPassengers; i++) {
        passengersInput.push(
            <PassengerInformation />
        )
    }
    return (
        <div>
            {passengersInput}
        </div>
    )
}

export default AccordianBody