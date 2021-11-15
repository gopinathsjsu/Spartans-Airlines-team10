import {
    Form, Button, Container, Col, Row, Figure
} from 'react-bootstrap';
import Navigationbar from '../Navigationbar/Navigationbar'
import { useDispatch } from 'react-redux'
import { mainSliceActions } from '../../store/mainSlice'
import './CommonLogin.css'

const EmployeeLogin = () => {
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
                                <Figure.Image
                                    src={`${window.location.origin}/employeelogin.svg`}
                                />
                            </Col>
                            <Col>
                                <Form id="login-form" method="post">
                                    <h1>Employee Login</h1>
                                    <p>Enter your details to login</p>
                                    <Form.Group className="loginbox" controlId="formUsername">
                                        <Form.Control type="email" name="email" placeholder="Enter Your Email" onChange={onChangeEmail} required />
                                    </Form.Group>
                                    <Form.Group className="loginbox" controlId="formPassword">
                                        <Form.Control type="password" name="password" placeholder="Enter Your Password" onChange={onChangePassword} required />
                                    </Form.Group>
                                    <br />
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

export default EmployeeLogin