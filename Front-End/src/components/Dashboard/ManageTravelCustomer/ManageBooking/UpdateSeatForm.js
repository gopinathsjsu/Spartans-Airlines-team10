import {Form, Row, Col, Button} from 'react-bootstrap'
import { useState } from 'react'

const UpdateSeatForm = (props) => {
    const [seatDetails, setSeatDetails] = useState('')

    const onChangeSeatNumber = (e) => {
        setSeatDetails(e.target.value)
    }

    const availableSeatsOptions = props.availableSeats.map((seat) => (
        <option value={`${seat.seatID}${seat.seatNumber}`}>{`${seat.seatID}${seat.seatNumber}`}</option>
    ))

    return (
        <div>
            <Form id="update-seat-form" method="post">
                    <Row>
                        <Col><Form.Control type="text" placeholder={props.passengerInfo.firstName} disabled /></Col>
                        <Col><Form.Control type="text" placeholder={props.passengerInfo.lastName} disabled /></Col>
                        <Col><Form.Control type="text" placeholder={`${props.passengerInfo.seatID}${props.passengerInfo.seatNumber}`} disabled /></Col>
                        <Col><Form.Control as="select" onChange={onChangeSeatNumber} className="my-1 mr-sm-2" custom required>
                                    <option selected="true" disabled>Choose Your Seat</option>
                                    {availableSeatsOptions}
                                </Form.Control></Col>
                        <Col><Button variant="primary" type="submit">
                            Update Seat
                    </Button></Col>
                    </Row>
                </Form>
        </div>
    )
}

export default UpdateSeatForm