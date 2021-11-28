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
import './EditFlight.css';
import "react-datepicker/dist/react-datepicker.css";



const EditFlight = () => {

	const dispatch = useDispatch()
    //const flightId = useSelector(state => state.mainSlice.flightid)
    const flightNumber = useSelector(state => state.mainSlice.flightnumber)
    const price = useSelector(state => state.mainSlice.price)
    const mileagePoints = useSelector(state => state.mainSlice.mileagepoints)	
	
	const onChangeFlightNumber = (e) => {
        dispatch(mainSliceActions.setFlightNumber(e.target.value))
        //sessionStorage.setItem('flightnumber', e.target.value)
    }
    const onChangePrice = (e) => {
        dispatch(mainSliceActions.setPrice(e.target.value))
        //sessionStorage.setItem('price', e.target.value)
    }
    const onChangeMileagePoints = (e) => {
        dispatch(mainSliceActions.setMileagePoints(e.target.value))
        //sessionStorage.setItem('mileagepoints', e.target.value)
    }
	
	const onEditFlight = (data) => {
        dispatch(mainSliceActions.setFlightNumber(data.flightId))
        dispatch(mainSliceActions.setPrice(data.price))
        dispatch(mainSliceActions.setMileagePoints(data.mileagePoints))
	   }
    
	   
	const handleEditFlight = (e) => {
        e.preventDefault()

        //const flightNumber = sessionStorage.getItem('flightnumber')
        //const price = sessionStorage.getItem('price')
        //const mileagePoints = sessionStorage.getItem('mileagepoints')

        const data = {
            //flightId,
            //price,
            //mileagePoints
            
        }
		       axios.defaults.withCredentials = true;
               console.log("printing req data")
               console.log(data)

        axios.put('http://localhost:3001/employee/editFlight/'+flightNumber+'/'+price+'/'+mileagePoints, data)
            .then((response) => {
                onEditFlight(response.data)
                //setRedirectFlag(true)
                console.log("printing response")
                console.log(response.data.message)
                printStatus(response)
            })
            .catch((err) => {
                console.log("printing catch error")
                console.log(err)
                invalidEditFlight()
            })
    }
    const printStatus=(response)=>toast.error(response.data.message)
	   const invalidEditFlight = () => toast.error('Flight Already Exists')
	       return (
	        <div>
			<div className="container">
			<Container>
            <div>
			<Row className="rows">
			<Col>
			
			<Form id="Editflight-form" method="post" onSubmit={handleEditFlight}> 
				<h1>Edit FLight</h1>
                <p>Enter details to Edit a flight</p>
			 
			<Form.Group className="Editflightbox" controlId="formFlightId">
                <Form.Control type="text" name="flightid" placeholder="Enter The Flight number" onChange={onChangeFlightNumber} required />
                </Form.Group>
                <Form.Group className="Editflightbox" controlId="formPrice">
                <Form.Control type="text" name="price" placeholder="Enter The price" onChange={onChangePrice} required />
                </Form.Group>
                <Form.Group className="Editflightbox" controlId="formMileagePoints">
                <Form.Control type="text" name="mileagepoints" placeholder="Enter The mileage points" onChange={onChangeMileagePoints} required />
                </Form.Group>

            <Button id="searchbutton"  type="submit">
			Edit
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

export default EditFlight