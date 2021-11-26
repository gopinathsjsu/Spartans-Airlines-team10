import {
    Col, Row, Form, Button
} from 'react-bootstrap';
import './EditFlight.css'

const EditFlight = () => {
    return (
        <div>
            <Form>
                <Row className="rows">
                    <Col><Form.Control placeholder="FlightId" /></Col>
                </Row>
                {/* <Row className="rows">
                    <Col><Form.Control placeholder="Depart" /></Col>
                    <Col><Form.Control placeholder="Arrive" /></Col>
                </Row> */}
                {/* <Row className="rows">
                    <Col><Form.Control placeholder="Depart Date" /></Col>
                    <Col><Form.Control placeholder="Passengers" /></Col>
                </Row> */}
                <Button id="searchbutton">Edit</Button>
            </Form>
        </div>
    )
}

export default EditFlight