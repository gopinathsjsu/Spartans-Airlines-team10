import {
    Form, Button, Container, Col, Row,
} from 'react-bootstrap';
import Navigationbar from '../Navigationbar/Navigationbar'
import { useDispatch } from 'react-redux'
import { mainSliceActions } from '../../store/mainSlice'

const Login = () => {
    const dispatch = useDispatch()

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
                                <Form id="login-form" method="post">
                                    <h1>Login</h1>
                                    <p>Enter your details to login</p>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" placeholder="Enter Your Email" onChange={onChangeEmail} required />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Enter Your Password" onChange={onChangePassword} required />
                                    </Form.Group>
                                    <Button id="loginbutton" type="submit">
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

export default Login;