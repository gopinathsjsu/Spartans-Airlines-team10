import {
    Col,
    Form, Row, Button
} from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { bookFlightActions } from '../../../../store/bookFlightSlice'
import toast, { Toaster } from 'react-hot-toast';

const PassengerInformation = (props) => {
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [seatDetails, setSeatDetails] = useState('')

    const numberOfPassengers = useSelector(state => state.searchFlightSlice.numberOfPassengers)
    const passengerCount = useSelector(state => state.bookFlightSlice.passengerCount)

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }

    const onChangeSeatNumber = (e) => {
        setSeatDetails(e.target.value)
    }

    const handleAddPassenger = (event, index) => {
        event.preventDefault()

        const passengerInformation = {
            firstName,
            lastName,
            seatID: seatDetails[0],
            seatNumber: seatDetails[1],
        }

        const data = {
            passengerInformation,
            index
        }

        dispatch(bookFlightActions.addPassenger(data))
        if (passengerCount < numberOfPassengers) {
            dispatch(bookFlightActions.incrementPassengerCount())
        }
        passengerAdded()
    }

    const passengerAdded = () => toast.success('Passenger Added Succesfully')

    return (
        <div>
            <Toaster />
            <div style={{ marginTop: '10px' }}>
                <Form id="book-flight-form" method="post" onSubmit={(e) => handleAddPassenger(e, props.index)}>
                    <Row>
                        <Col><Form.Control type="text" placeholder="First Name" onChange={onChangeFirstName} required /></Col>
                        <Col><Form.Control type="text" placeholder="Last Name" onChange={onChangeLastName} required /></Col>
                        <Col><Form.Control type="text" placeholder="Seat Number" onChange={onChangeSeatNumber} required /></Col>
                        <Col><Button variant="primary" type="submit">
                            Add
                    </Button></Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default PassengerInformation