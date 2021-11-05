import {
    Form, Button, Container, Col, Row,
} from 'react-bootstrap';
import Navigationbar from '../Navigationbar/Navigationbar'
import { useDispatch } from 'react-redux'
import { mainSliceActions } from '../../store/mainSlice'

const ProfilePage = () => {
    const dispatch = useDispatch()

    const onChangeFullName = (e) => {
        dispatch(mainSliceActions.setFullName(e.target.value))
    }
    const onChangeEmailAddress = (e) => {
        dispatch(mainSliceActions.setEmailAddress(e.target.value))
    }
	    const onChangeAddress = (e) => {
        dispatch(mainSliceActions.setAddress(e.target.value))
    }
	    const onChangePhoneNumber = (e) => {
        dispatch(mainSliceActions.setPhoneNumber(e.target.value))
    }
    const onChangeChangePassword = (e) => {
        dispatch(mainSliceActions.setChangePassword(e.target.value))
    }
    return (
        <div>
            <Navigationbar />
            <div className="container">
                <Container>
                    <div>
                        <Row>
                            <Col>
                                <Form id="profile-form" method="post">
                                    <h1>Profile</h1>
                                    <p>Enter Details</p>
                                    <Form.Group controlId="formFullName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" name="fullname" placeholder="Enter Your Full Name" onChange={onChangeFullName} required />
                                    </Form.Group>
                                    <Form.Group controlId="formEmailAddress">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" name="emailaddress" placeholder="Enter Your Email Address" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={onChangeEmailAddress} required />
                                    </Form.Group>
  									<Form.Group controlId="formAddress">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" name="address" placeholder="Enter Your Address" onChange={onChangeAddress} required />
                                    </Form.Group>
									<Form.Group controlId="formPhoneNumber">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" name="phonenumber" placeholder="Enter Your Phone Number" onChange={onChangePhoneNumber} required />
                                    </Form.Group>
									<Form.Group controlId="formChangePassword">
                                        <Form.Label>Change Password</Form.Label>
                                        <Form.Control type="password" name="changepassword" placeholder="Enter Your Password to Change" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={onChangeChangePassword} required />
                                    </Form.Group>
                                    <small>
                                        Must contain at least one  number and one uppercase and
                                        lowercase letter, and at least 8 or more characters
									</small>
                                    <br />
                                    <br />
                                    <Button id="submitbutton" type="submit">
                                        Submit
                      </Button>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default ProfilePage;