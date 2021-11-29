import {
    Col, Row, Form, Button
} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchFlightActions } from '../../../store/searchFlightSlice'
import { Redirect } from 'react-router-dom';
import './SearchFlight.css'
import "react-datepicker/dist/react-datepicker.css";

const SearchFlight = () => {
    const dispatch = useDispatch()
    const [redirectFlag, setRedirectFlag] = useState(false)

    const departureDate = useSelector(state => state.searchFlightSlice.departureDate)

    const onChangeDepartureLocation = (e) => {
        dispatch(searchFlightActions.setDepartureLocation(e.target.value))
    }

    const onChangeArrivalLocation = (e) => {
        dispatch(searchFlightActions.setArrivalLocation(e.target.value))
    }

    const onChangeDepartureDate = (e) => {
        dispatch(searchFlightActions.setDepartureDate(e.toISOString()))
    }
    
    const onChangePassengers = (e) => {
        dispatch(searchFlightActions.setNumberOfPassengers(e.target.value))
    }

    const handleSearchFlight = (event) => {
        event.preventDefault()
        setRedirectFlag(true)
    }

    return (
        <div>
            {redirectFlag ? <Redirect to="/bookflight" /> : null}
            <Form id="search-flight-form" method="post" onSubmit={handleSearchFlight}>
                <Row className="rows">
                    <Col>
                        <Form.Group controlId="formDepartureLocation">
                            <Form.Control type="text" name="departureLocation" placeholder="Depart" onChange={onChangeDepartureLocation} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formArrivalLocation">
                            <Form.Control type="text" name="arrivalLocation" placeholder="Arrive" onChange={onChangeArrivalLocation} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="rows">
                    <Col>
                        <Row style={{ textAlign: "left" }}>
                            <Col>
                                <Form.Label>Departure Date:</Form.Label>
                            </Col>
                            <Col>
                                <DatePicker selected={new Date(departureDate)} onChange={(date) => onChangeDepartureDate(date)} showTimeSelect />
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Form.Group controlId="formPassengers">
                            <Form.Control type="text" name="passengers" onChange={onChangePassengers} as="select" required>
                                <option hidden value="Number of Passengers">Number of Passengers</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Button id="searchbutton" type="submit">Search</Button>
            </Form>
        </div>
    )
}

export default SearchFlight