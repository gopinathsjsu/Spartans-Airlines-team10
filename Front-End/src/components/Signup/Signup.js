import {
    Form, Button, Container, Col, Row, Figure
} from 'react-bootstrap';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import Navigationbar from '../Navigationbar/Navigationbar';
import { useDispatch, useSelector } from 'react-redux';
import { mainSliceActions } from '../../store/mainSlice';
import './Signup.css';
import "react-datepicker/dist/react-datepicker.css";

const Signup = () => {
    const dispatch = useDispatch()

    const firstName = useSelector(state => state.mainSlice.firstname)
    const lastName = useSelector(state => state.mainSlice.lastname)
    const address = useSelector(state => state.mainSlice.address)
    const phoneNum = useSelector(state => state.mainSlice.phonenumber)
    const gender = useSelector(state => state.mainSlice.gender)
    const dob = useSelector(state => state.mainSlice.dob)
    const emailID = useSelector(state => state.mainSlice.email)
    const password = useSelector(state => state.mainSlice.password)

    const onChangeFirstName = (e) => {
        dispatch(mainSliceActions.setFirstName(e.target.value))
    }

    const onChangeLastName = (e) => {
        dispatch(mainSliceActions.setLastName(e.target.value))
    }

    const onChangeAddress = (e) => {
        dispatch(mainSliceActions.setAddress(e.target.value))
    }

    const onChangePhoneNumber = (e) => {
        dispatch(mainSliceActions.setPhoneNumber(e.target.value))
    }

    const onChangeGender = (e) => {
        dispatch(mainSliceActions.setGender(e.target.value))
    }

    const onChangeDob = (e) => {
        dispatch(mainSliceActions.setDob(e.toISOString()))
    }

    const onChangeEmail = (e) => {
        dispatch(mainSliceActions.setEmail(e.target.value))
    }

    const onChangePassword = (e) => {
        dispatch(mainSliceActions.setPassword(e.target.value))
    }

    const onSignUp = (data) => {
        sessionStorage.setItem('userId', data._id)
        dispatch(mainSliceActions.setFirstName(data.firstName))
        dispatch(mainSliceActions.setLastName(data.lastName))
        dispatch(mainSliceActions.setAddress(data.address))
        dispatch(mainSliceActions.setPhoneNumber(data.phoneNum))
        dispatch(mainSliceActions.setGender(data.gender))
        dispatch(mainSliceActions.setDob(data.dob))
        dispatch(mainSliceActions.setEmail(data.emailID))
        dispatch(mainSliceActions.setPassword(''))
    }

    const handleSignup = (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            address,
            phoneNum,
            gender,
            dob,
            emailID,
            password
        }

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/signup', data)
            .then((response) => {
                onSignUp(response.data)
                validSignUp()
            })
            .catch(() => {
                invalidSignUp()
            })
    }

    const validSignUp = () => toast.success('Signed Up Successfully!')
    const invalidSignUp = () => toast.error('Email Address Already Exists')

    return (
        <div>
            <Toaster />
            <Navigationbar />
            <div className="container">
                <Container>
                    <div>
                        <Row>
                            <Col>
                                <Figure.Image
                                    src={`${window.location.origin}/signup.svg`}
                                />
                            </Col>
                            <Col>
                                <Form id="signup-form" method="post" onSubmit={handleSignup}>
                                    <h1>Sign Up</h1>
                                    <p>Enter your details to create an account</p>
                                    <Form.Group className="signupbox" controlId="formFirstName">
                                        <Form.Control type="text" name="firstname" placeholder="Enter Your First Name" onChange={onChangeFirstName} required />
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formLastName">
                                        <Form.Control type="text" name="lastname" placeholder="Enter Your Last Name" onChange={onChangeLastName} required />
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formAddress">
                                        <Form.Control type="text" name="address" placeholder="Enter Your Address" onChange={onChangeAddress} required />
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formPhoneNumber">
                                        <Form.Control type="text" name="phonenumber" placeholder="Enter Your Phone Number" onChange={onChangePhoneNumber} required />
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formGender">
                                        <Form.Control type="text" name="gender" onChange={onChangeGender} as="select" required>
                                            <option hidden value="Choose Your Gender">Choose Gender</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formDob">
                                        <Row style={{ textAlign: "left" }}>
                                            <Col>
                                                <Form.Label>Pick Your Date of Birth:</Form.Label>
                                            </Col>
                                            <Col>
                                                <DatePicker selected={new Date(dob)} onChange={(date) => onChangeDob(date)} />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formEmail">
                                        <Form.Control type="email" name="email" placeholder="Enter Your Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={onChangeEmail} required />
                                    </Form.Group>
                                    <Form.Group className="signupbox" controlId="formPassword">
                                        <Form.Control type="password" name="password" placeholder="Enter Your Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={onChangePassword} required />
                                    </Form.Group>
                                    <br />
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