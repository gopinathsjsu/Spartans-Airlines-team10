import AccordianHeader from './AccordianHeader'
import AccordianBody from './AccordianBody'
import { Accordion } from 'react-bootstrap'
import axios from 'axios';
import { bookFlightActions } from '../../../../store/bookFlightSlice'
import { useDispatch, useSelector } from 'react-redux'
import './FlightInformation.css'


const FlightInformation = (props) => {
    const dispatch = useDispatch()
    const flightID = props.flight._id
    const numberOfPassengers = useSelector(state => state.searchFlightSlice.numberOfPassengers)

    const onClickAccordianHeader = async () => {
        console.log(props.flight)

        dispatch(bookFlightActions.setPassengerList(numberOfPassengers))
        dispatch(bookFlightActions.resetPassengerCount())

        const res = await axios.get(`http://localhost:3001/flights/getAvailableSeats/${flightID}`)
        dispatch(bookFlightActions.setAvailableSeats(res.data.message[0].seats))
    }

    return (
        <div>
            <Accordion.Item eventKey={props.eventKey.toString()} style={{marginBottom:'10px', borderWidth:'3px'}}>
                <Accordion.Header id="accordianheader" onClick={onClickAccordianHeader}>
                    <AccordianHeader flight={props.flight} />
                </Accordion.Header>
                <Accordion.Body>
                    <AccordianBody flight={props.flight} />
                </Accordion.Body>
            </Accordion.Item>

        </div>
    )
}

export default FlightInformation