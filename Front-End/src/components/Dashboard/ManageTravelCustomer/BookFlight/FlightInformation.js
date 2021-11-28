import AccordianHeader from './AccordianHeader'
import AccordianBody from './AccordianBody'
import { Accordion } from 'react-bootstrap'
import './FlightInformation.css'


const FlightInformation = (props) => {
    return (
        <div>
            <Accordion.Item eventKey={props.eventKey.toString()}>
                <Accordion.Header id="accordianheader">
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