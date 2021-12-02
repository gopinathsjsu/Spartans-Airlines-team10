import {
    Form, Button, Container, Col, Row, Figure, ListGroup
} from 'react-bootstrap';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import Navigationbar from '../../Navigationbar/Navigationbar';
import { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mainSliceActions } from '../../../store/mainSlice';
import './EditFlight.css';
import "react-datepicker/dist/react-datepicker.css";



const EditFlight = () => {
    const [allFlightInformation, setAllFlightInformation] = useState([])

    useEffect(() => {
        const getAllFlightInformation = async () => {
            const employeeID = sessionStorage.getItem('employeeId')
            console.log(cookie.load('cookie'))
            const res = await axios.get(`http://localhost:3001/employee/getUpcomingFlights/${employeeID}`)
            const allFlights = res.data.response

            console.loga(allFlights)
    
            /* const data = allFlights.map((individualData) => {
                return <ListGroup.Item key={individualData._id} style={{textAlign:'left', marginBottom:'10px', borderWidth:'2px'}}><TravelInformation individualData={individualData} /></ListGroup.Item>
            })
    
            setAllFlightInformation(data) */
        }

        getAllFlightInformation()
    }, [])

    return (
        <div className="container">
            <Container>
                <div>

                </div>
            </Container>
        </div>
    )
}

export default EditFlight