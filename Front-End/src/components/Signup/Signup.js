import {
    Form, Button, Container, Col, Row,
} from 'react-bootstrap';
import Navigationbar from '../Navigationbar/Navigationbar'
import { useDispatch } from 'react-redux'
import { mainSliceActions } from '../../store/mainSlice'

const Signup = () => {
    const dispatch = useDispatch()

    const onChangeName = (e) => {
        dispatch(mainSliceActions.setName(e.target.value))
    }

    const onChangeEmail = (e) => {
        dispatch(mainSliceActions.setEmail(e.target.value))
    }

    const onChangePassword = (e) => {
        dispatch(mainSliceActions.setPassword(e.target.value))
    }

    return (
        <div>
            <Navigationbar />
            <div className="container">
                <Container>
                    <div>
                        <Row>
                            <Col>
                                <Form id="signup-form" method="post">
                                    <h1>Sign Up</h1>
                                    <p>Enter your details to create an account</p>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" placeholder="Enter Your Name" onChange={onChangeName} required />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" placeholder="Enter Your Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={onChangeEmail} required />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Enter Your Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={onChangePassword} required />
                                    </Form.Group>
                                    <small>
                                        Must contain at least one  number and one uppercase and
                                        lowercase letter, and at least 8 or more characters
                      </small>
                                    <br />
                                    <br />
                                    <Button id="signupbutton" type="submit">
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

export default Signup;