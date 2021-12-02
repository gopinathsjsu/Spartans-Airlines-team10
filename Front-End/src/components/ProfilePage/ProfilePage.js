import {
    Form, Button, Container, Col, Row,
} from 'react-bootstrap';
import cookie from 'react-cookies';
import Navigationbar from '../Navigationbar/Navigationbar'
import { useDispatch, useSelector } from 'react-redux'
import { mainSliceActions } from '../../store/mainSlice'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import { Redirect } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import './ProfilePage.css'

const ProfilePage = () => {
    const dispatch = useDispatch()

    const loadedCookie = cookie.load('cookie')

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

    const onChangeEmailAddress = (e) => {
        dispatch(mainSliceActions.setEmail(e.target.value))
    }

    /* const onProfile = (data) => {
        dispatch(mainSliceActions.setFirstName(data.firstName))
        dispatch(mainSliceActions.setLastName(data.lastName))
        dispatch(mainSliceActions.setAddress(data.address))
        dispatch(mainSliceActions.setPhoneNumber(data.phoneNum))
        dispatch(mainSliceActions.setGender(data.gender))
        dispatch(mainSliceActions.setDob(data.dob))
        dispatch(mainSliceActions.setEmail(data.emailID))

    } */

    const handleProfile = (e) => {
        e.preventDefault()
        const customerID = sessionStorage.getItem('customerId')

        console.log(dob)
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

        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3001/profile', data)
            .then((response) => {
                // onProfile(response.data)
                validProfile()
            })
            .catch(() => {
                invalidProfile()
            })
    }

    const validProfile = () => toast.success('Profile Changed Successfully!')
    const invalidProfile = () => toast.error('Email Address Already Exists')


    return (
        <div>
            {!loadedCookie ? <Redirect to="/" /> : null}
            <Toaster />
            <Navigationbar />
            <div className="container">
                <Container>
                    <div>
                        <Row>
                            <Col>
                                <Form id="profile-form" method="post" onSubmit={handleProfile}>
                                    <h1 id="heading">Your Profile</h1>
                                    <div id="profileformbox">
                                        <Form.Group className="profilebox" controlId="formFirstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control className="profileinput" type="text" name="firstname" value={firstName} onChange={onChangeFirstName} required />
                                        </Form.Group>
                                        <Form.Group className="profilebox" controlId="formLastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control className="profileinput" type="text" name="lastname" value={lastName} onChange={onChangeLastName} required />
                                        </Form.Group>
                                        <Form.Group className="profilebox" controlId="formEmailAddress">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control className="profileinput" type="email" name="emailaddress" value={emailID} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={onChangeEmailAddress} required />
                                        </Form.Group>
                                        <Form.Group className="profilebox" controlId="formAddress">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control className="profileinput" type="text" name="address" value={address} onChange={onChangeAddress} required />
                                        </Form.Group>
                                        <Form.Group className="profilebox" controlId="formPhoneNumber">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control className="profileinput" type="text" name="phonenumber" value={phoneNum} onChange={onChangePhoneNumber} required />
                                        </Form.Group>
                                        <Form.Group className="profilebox" controlId="formGender">
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Control id="genderinput" type="text" name="gender" value={gender} onChange={onChangeGender} as="select" required>
                                                <option hidden value="Choose Your Gender">Choose Gender</option>
                                                <option value="M">Male</option>
                                                <option value="F">Female</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group className="profilebox" controlId="formDob">
                                            <Form.Label>Date of Birth:</Form.Label>
                                            <DatePicker id="dateinput" selected={new Date(dob)} onChange={(date) => onChangeDob(date)} />
                                        </Form.Group>
                                        <br />
                                        <Button id="submitbutton" type="submit">
                                            Update
                                    </Button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default ProfilePage
