import { useState } from 'react'
import { Offcanvas, Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './OffCanvas.css'

const OffCanvas = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        sessionStorage.removeItem('customerId')
        sessionStorage.removeItem('employeeId')
    }

    return (
        <>
            <Button id="navbarchart" className="mr-sm-2 navbarbuttons" onClick={handleShow}>
                My Menu
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h1>My Menu</h1></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush">
                        {sessionStorage.getItem('customerId') ? <ListGroup.Item>
                            <Link
                                className="pageLink"
                                to={{
                                    pathname: '/profile',
                                }}
                            >
                                <h3 className="options">Profile</h3>
                            </Link>
                        </ListGroup.Item> : null}
                        {sessionStorage.getItem('customerId') ? <ListGroup.Item>
                            <Link
                                className="pageLink"
                                to={{
                                    pathname: '/managetravel',
                                }}
                            >
                                <h3 className="options">Manage Travel</h3>
                            </Link>
                        </ListGroup.Item> : null}
                        {sessionStorage.getItem('customerId') ? null : <ListGroup.Item>
                            <Link
                                className="pageLink"
                                to={{
                                    pathname: '/managetravelemployee',
                                }}
                            >
                                <h3 className="options">Manage Travel Employee</h3>
                            </Link>
                        </ListGroup.Item>}
                        <ListGroup.Item>
                            <Button id="logoutbutton" href="/" onClick={handleLogout}>
                                <h3>Logout</h3>
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default OffCanvas