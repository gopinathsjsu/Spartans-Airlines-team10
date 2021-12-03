import {
    Button, Modal, Form, Row, Col
} from 'react-bootstrap';
import { useState } from 'react'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Redirect } from 'react-router';

const EditFlightModal = (props) => {
    const [price, setPrice] = useState(0)
    const [mileagePoints, setMileagePoints] = useState(0)
    const [show, setShow] = useState(false);
    const [editedFlag, setEditedFlag] = useState(false)
    const [redirectPage, setRedirectPage] = useState(null)

    const flightID = props.individualData._id

    const onChangePrice = (e) => {
        setPrice(e.target.value)
    }

    const onChangeMileagePoints = (e) => {
        setMileagePoints(e.target.value)
    }

    const handleClose = () => setShow(false);

    const handleShow = async () => setShow(true);

    const handleEditFlightPrice = async (event) => {
        event.preventDefault()
        axios.defaults.withCredentials = true;
        axios.put(`http://localhost:3001/employee/editFlight/${flightID}`, { price } )
            .then((response) => {
                console.log(response)
                setEditedFlag(true)
            })
            .catch(() => {
            })
    }

    const handleEditFlightMileagePoints = async (event) => {
        event.preventDefault()

        axios.defaults.withCredentials = true;
        axios.put(`http://localhost:3001/employee/editFlight/${flightID}`, { mileagePoints } )
            .then((response) => {
                console.log(response)
                setEditedFlag(true)
            })
            .catch(() => {
            })
    }

    const onConfirm = () => {
        setEditedFlag(false)
        setRedirectPage(<Redirect to='/employeedashboard' />)
    }

    return (
        <div>
            {redirectPage}
            {editedFlag ? <SweetAlert
                success
                title={"Successfully Edited !"}
                onConfirm={onConfirm}
                dependencies={[editedFlag]}
            ></SweetAlert> : null}
            <div><Button variant="primary" onClick={handleShow}>Edit</Button></div>
            <Modal dialogClassName="editmodal" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Flight</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="edit-flight-price-form" method="post" onSubmit={handleEditFlightPrice}>
                        <Row style={{ marginBottom: '10px' }}>
                            <Col><Form.Control type="text" placeholder="Enter New Price" onChange={onChangePrice} /></Col>
                            <Col><Button variant="primary" type="submit">Edit</Button></Col>
                        </Row>
                    </Form>

                    <Form id="edit-flight-mileagepoints-form" method="post" onSubmit={handleEditFlightMileagePoints}>
                        <Row>
                            <Col><Form.Control type="text" placeholder="Enter New Mileage Points" onChange={onChangeMileagePoints} /></Col>
                            <Col><Button variant="primary" type="submit">Edit</Button></Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default EditFlightModal