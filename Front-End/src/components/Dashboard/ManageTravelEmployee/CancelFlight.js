import {
    Form, Button, Container, Col, Row, Figure
} from 'react-bootstrap';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from "react-datepicker";
import Navigationbar from '../../Navigationbar/Navigationbar';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mainSliceActions } from '../../../store/mainSlice';
import './CancelFlight.css';
import "react-datepicker/dist/react-datepicker.css";



const CancelFlight = () => {

	const dispatch = useDispatch()
    const flightId = useSelector(state => state.mainSlice.flightid)
	
	const onChangeFlightId = (e) => {

        dispatch(mainSliceActions.setFlightId(e.target.value))
        //sessionStorage.setItem('flightid', e.target.value)
    }
	
	const onCancelFlight = (data) => {
	   dispatch(mainSliceActions.setFlightId(data.flightId))
	   }
	   
	const handleCancelFlight = (e) => {
        e.preventDefault()

   
        //const flightId = sessionStorage.getItem('flightid')
        //const flightid=mainSliceActions.flightid;
        const data = {
            //flightId
        }
               
		       axios.defaults.withCredentials = true;
               console.log("printing req data")
               console.log(data)
        axios.delete('http://localhost:3001/employee/cancelFlight/'+flightId, data)
            .then((response) => {
                onCancelFlight(response.data)
                console.log("printing response")
                console.log(response.data.message)
                printStatus(response)
                //setRedirectFlag(true)
            })
            .catch((err) => {
                console.log("printing catch error")
                console.log(err)
                invalidCancelFlight()
            })
    }
        const printStatus=(response)=>toast.error(response.data.message)
	   const invalidCancelFlight = () => toast.error('Flight Already Cancelled')
	       return (
	        <div>
            <Toaster />
			<div className="container">
			<Container>
            <div>
			<Row className="rows">
			<Col>
			
			<Form id="cancelflight-form" method="post" onSubmit={handleCancelFlight}> 
				<h1>Cancel FLight</h1>
                {/* <p>Enter details to cancel a flight</p> */}
			 
			<Form.Group className="cancelflightbox" controlId="formFlightId">
                <Form.Control type="text" name="flightid" placeholder="Enter The Flight Id" onChange={onChangeFlightId} required />
                </Form.Group>

            <Button id="searchbutton"  type="submit">
			Cancel
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

export default CancelFlight