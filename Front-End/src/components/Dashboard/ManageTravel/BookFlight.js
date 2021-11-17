import {
    Col, Row, Form, Button
} from 'react-bootstrap';
import './BookFlight.css'

const BookFlight = () => {
    return (
        <div>
            <Form>
                <Row className="rows">
                    <Col><Form.Control placeholder="Depart" /></Col>
                    <Col><Form.Control placeholder="Arrive" /></Col>
                </Row>
                <Row className="rows">
                    <Col><Form.Control placeholder="Depart Date" /></Col>
                    <Col><Form.Control placeholder="Passengers" /></Col>
                </Row>
                <Button id="searchbutton">Search</Button>
            </Form>
        </div>
    )
}

export default BookFlight