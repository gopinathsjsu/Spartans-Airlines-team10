import {
    Form, Button, Container, Col, Row, Figure
} from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import Navigationbar from '../Navigationbar/Navigationbar'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { mainSliceActions } from '../../store/mainSlice'
import './CommonLogin.css'
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const EmployeeLogin = () => {
    const [redirectFlag, setRedirectFlag] = useState(false)
    const dispatch = useDispatch()
    const email = useSelector(state => state.mainSlice.email)
    const password = useSelector(state => state.mainSlice.password)

    const onChangeEmail = (e) => {
        dispatch(mainSliceActions.setEmail(e.target.value))
    }

    const onChangePassword = (e) => {
        dispatch(mainSliceActions.setPassword(e.target.value))
    }

    const onLogin = (data) => {
        sessionStorage.setItem('employeeId', data._id)
    }

    const handleLogin = (event) => {
        event.preventDefault()

        const data = {
            emailID: email,
            password
        }

        console.log(data)

        axios.defaults.withCredentials = true;
        axios.post('http://18.144.101.175:3001/employee/login', data)
            .then((response) => {
                onLogin(response.data.response)
                setRedirectFlag(true)
            })
            .catch((e) => {
                console.log(e)
                invalidLogin()
            })
    }

    const invalidLogin = () => toast.error('Invalid Email Address or Password.')

    return (
        <div>
        {redirectFlag ? <Redirect to="/employeedashboard" /> : null}
            <Toaster />
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
                                <Form id="login-form" method="post"  onSubmit={handleLogin}>
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