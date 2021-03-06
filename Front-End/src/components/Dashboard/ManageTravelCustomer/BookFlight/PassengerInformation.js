import {
    Col,
    Form, Row, Button, FormGroup
} from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { bookFlightActions } from '../../../../store/bookFlightSlice'

const PassengerInformation = (props) => {
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [seatDetails, setSeatDetails] = useState('')

    const numberOfPassengers = useSelector(state => state.searchFlightSlice.numberOfPassengers)
    const passengerCount = useSelector(state => state.bookFlightSlice.passengerCount)
    const availableSeats = useSelector(state => state.bookFlightSlice.availableSeats)

    const availableSeatsOptions = availableSeats.map((seat) => (
        <option value={`${seat.seatID}${seat.seatNumber}`}>{`${seat.seatID}${seat.seatNumber}`}</option>
    ))

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }

    const onChangeSeatNumber = (e) => {
        console.log(e.target.value)
        setSeatDetails(e.target.value)
    }

    const handleAddPassenger = (event, index) => {
        event.preventDefault()

        const passengerInformation = {
            firstName,
            lastName,
            seatID: seatDetails[0],
            seatNumber: seatDetails.slice(1),
        }

        const data = {
            passengerInformation,
            index
        }

        dispatch(bookFlightActions.addPassenger(data))
        if (passengerCount < numberOfPassengers) {
            dispatch(bookFlightActions.incrementPassengerCount())
        }
        dispatch(bookFlightActions.setAddedPassengerFlag(true))
    }



    return (
        <div>
            <div style={{ marginTop: '10px' }}>
                <Form id="book-flight-form" method="post" onSubmit={(e) => handleAddPassenger(e, props.index)}>
                    <Row>
                        <Col><Form.Control type="text" placeholder="First Name" onChange={onChangeFirstName} required /></Col>
                        <Col><Form.Control type="text" placeholder="Last Name" onChange={onChangeLastName} required /></Col>
                        <Col>
                            <FormGroup>
                                <Form.Control as="select" onChange={onChangeSeatNumber} className="my-1 mr-sm-2" custom required>
                                    <option selected="true" disabled>Choose Your Seat</option>
                                    {availableSeatsOptions}
                                </Form.Control>
                            </FormGroup>
                        </Col>
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