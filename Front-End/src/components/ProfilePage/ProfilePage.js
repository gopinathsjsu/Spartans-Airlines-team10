import {
    Form, Button, Container, Col, Row,
} from 'react-bootstrap';
import Navigationbar from '../Navigationbar/Navigationbar'
import { useDispatch, useSelector } from 'react-redux'
import { mainSliceActions } from '../../store/mainSlice'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import Moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
const ProfilePage = () => {
    const dispatch = useDispatch()
    const firstName = useSelector(state => state.mainSlice.firstname)
    const lastName = useSelector(state => state.mainSlice.lastname)
    const address = useSelector(state => state.mainSlice.address)
    const phoneNum = useSelector(state => state.mainSlice.phonenumber)
    const gender = useSelector(state => state.mainSlice.gender)
    const dob = useSelector(state => state.mainSlice.dob)
    const emailID = useSelector(state => state.mainSlice.email)

    const onChangeFirstName = (e) => {
        dispatch(mainSliceActions.setFirstName(e.target.value))
    }

    const onChangeLastName = (e) => {
        dispatch(mainSliceActions.setLastName(e.target.value))
    }

    const onChangeEmailAddress = (e) => {
        dispatch(mainSliceActions.setEmail(e.target.value))
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
        dispatch(mainSliceActions.setDob(Moment(e).format('MM/DD/YYYY')))
    }



    const onProfile = (data) => {
        sessionStorage.setItem('userId', data._id)
        dispatch(mainSliceActions.setFirstName(data.firstName))
        dispatch(mainSliceActions.setLastName(data.lastName))
        dispatch(mainSliceActions.setDob(data.dob))
        dispatch(mainSliceActions.setGender(data.gender))
        dispatch(mainSliceActions.setAddress(data.address))
        dispatch(mainSliceActions.setEmail(data.emailID))
        dispatch(mainSliceActions.setPhoneNumber(data.phoneNum))
    }

    const handleProfile = (e) => {
        e.preventDefault()
        const customerID=sessionStorage.getItem('userId')

        const data = {
            firstName,
            lastName,
            dob,
            gender,
            address,
            emailID,
            phoneNum,
            customerID,
        }

        console.log(data)
        console.log(sessionStorage.getItem('userId'))
        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3001/profile', data)
            .then((response) => {
                onProfile(response.data)
                validProfile()
            })
            .catch(() => {
                invalidProfile()
            })
    }

    const validProfile = () => toast.success('Profile changed Successfully!')
    const invalidProfile = () => toast.error('Email Address Already Exists')


    return (
        <div>
            <Navigationbar />
            <div className="container">
                <Container>
                    <div>
                        <Row>
                            <Col>
                                <Form id="profile-form" method="post" onSubmit={handleProfile}>
                                    <h1>Profile</h1>
                                    <p>Enter Details</p>
                                    <Form.Group controlId="formFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" name="firstname" placeholder={firstName} onChange={onChangeFirstName} required />
                                    </Form.Group>
                                    <Form.Group controlId="formLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" name="lastname" placeholder={lastName} onChange={onChangeLastName} required />
                                    </Form.Group>
                                    <Form.Group controlId="formEmailAddress">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" name="emailaddress" placeholder={emailID} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={onChangeEmailAddress} required />
                                    </Form.Group>
                                    <Form.Group controlId="formAddress">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" name="address" placeholder={address} onChange={onChangeAddress} required />
                                    </Form.Group>
                                    <Form.Group controlId="formPhoneNumber">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" name="phonenumber" placeholder={phoneNum} onChange={onChangePhoneNumber} required />
                                    </Form.Group>
                                    <Form.Group className="profilebox" controlId="formGender">
                                        <Form.Control type="text" name="gender" onChange={onChangeGender} as="select" required>
                                            <option hidden value="Choose Your Gender">Choose Gender</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="profilebox" controlId="formDob">
                                        <Row style={{ textAlign: "left" }}>
                                            <Col>
                                                <Form.Label>Pick Your Date of Birth:</Form.Label>
                                            </Col>
                                            <Col>
                                                <DatePicker selected={new Date(dob)} onChange={(date) => onChangeDob(date)} />
                                            </Col>
                                        </Row>
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
