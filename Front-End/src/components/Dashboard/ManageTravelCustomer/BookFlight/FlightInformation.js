import AccordianHeader from './AccordianHeader'
import AccordianBody from './AccordianBody'
import { Accordion } from 'react-bootstrap'
import { bookFlightActions } from '../../../../store/bookFlightSlice'
import { useDispatch, useSelector } from 'react-redux'
import './FlightInformation.css'


const FlightInformation = (props) => {
    const dispatch = useDispatch()
    const numberOfPassengers = useSelector(state => state.searchFlightSlice.numberOfPassengers)

    const onClickAccordianHeader = () => {
        dispatch(bookFlightActions.setPassengerList(numberOfPassengers))
        dispatch(bookFlightActions.resetPassengerCount())
    }

    return (
        <div>
            <Accordion.Item eventKey={props.eventKey.toString()}>
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