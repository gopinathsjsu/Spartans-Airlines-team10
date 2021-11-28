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
import './AddFlight.css';
import "react-datepicker/dist/react-datepicker.css";



const AddFlight = () => {

    const dispatch = useDispatch()	
	const flightNumber = useSelector(state => state.mainSlice.flightnumber)
    const carrier = useSelector(state => state.mainSlice.carrier)
    const origin = useSelector(state => state.mainSlice.origin)
    const originCode = useSelector(state => state.mainSlice.origincode)
    const destination = useSelector(state => state.mainSlice.destination)
    const destinationCode = useSelector(state => state.mainSlice.destinationcode)
    const depDate = useSelector(state => state.mainSlice.depdate)
    const depMonth = useSelector(state => state.mainSlice.depmonth)
    const arrDate = useSelector(state => state.mainSlice.arrdate)
    const arrMonth = useSelector(state => state.mainSlice.arrmonth)
    const depYear = useSelector(state => state.mainSlice.depyear)
    const depHrs = useSelector(state => state.mainSlice.dephrs)
    const depMins = useSelector(state => state.mainSlice.depmins)
    const arrHrs = useSelector(state => state.mainSlice.arrhrs)
    const arrMins = useSelector(state => state.mainSlice.arrmins)
    const arrYear = useSelector(state => state.mainSlice.arryear)
 
    const price = useSelector(state => state.mainSlice.price)
    const capacity = useSelector(state => state.mainSlice.capacity)
    const mileagePoints = useSelector(state => state.mainSlice.mileagepoints)
    const travelDistance = useSelector(state => state.mainSlice.traveldistance)
    const flightid = useSelector(state => state.mainSlice.flightid)	

    const onChangeFlightNumber = (e) => { 
        dispatch(mainSliceActions.setFlightNumber(e.target.value)) 		
    }	
    const onChangeCarrier = (e) => { 
        dispatch(mainSliceActions.setCarrier(e.target.value)) 		
    }	
    const onChangeOrigin = (e) => { 
        dispatch(mainSliceActions.setOrigin(e.target.value)) 			
    }	
    const onChangeOriginCode = (e) => { 
        dispatch(mainSliceActions.setOriginCode(e.target.value)) 		
    }	
    const onChangeDestination = (e) => { 
        dispatch(mainSliceActions.setDestination(e.target.value)) 		
    }	
    const onChangeDestinationCode = (e) => {
        dispatch(mainSliceActions.setDestinationCode(e.target.value)) 	
    }
    const onChangedepDate = (e) => {
        dispatch(mainSliceActions.setdepDate(e.target.value)) 	
    }
    const onChangedepMonth = (e) => {
        dispatch(mainSliceActions.setdepMonth(e.target.value)) 	
    }
    const onChangearrDate = (e) => {
        dispatch(mainSliceActions.setarrDate(e.target.value)) 	
    }
    const onChangearrMonth = (e) => {
        dispatch(mainSliceActions.setarrMonth(e.target.value)) 	
    }
    const onChangedepYear = (e) => {
        dispatch(mainSliceActions.setdepYear(e.target.value)) 	
    }
    const onChangedepHrs = (e) => {
        dispatch(mainSliceActions.setdepHrs(e.target.value)) 	
    }
    const onChangedepMins = (e) => {
        dispatch(mainSliceActions.setdepMins(e.target.value)) 	
    }
    const onChangearrHrs = (e) => {
        dispatch(mainSliceActions.setarrHrs(e.target.value)) 	
    }
    const onChangearrMins = (e) => {
        dispatch(mainSliceActions.setarrMins(e.target.value)) 	
    }
    const onChangearrYear = (e) => {
        dispatch(mainSliceActions.setarrYear(e.target.value)) 	
    }
    const onChangeCapacity = (e) => { 
        dispatch(mainSliceActions.setCapacity(e.target.value)) 			
    }	
    const onChangeSeatsLeft = (e) => { 
        dispatch(mainSliceActions.setSeatsLeft(e.target.value)) 		
    }	
    const onChangeTravelDistance  = (e) => {
        dispatch(mainSliceActions.setTravelDistance(e.target.value)) 	
    }	
    const onChangeDuration = (e) => {
        dispatch(mainSliceActions.setDuration(e.target.value)) 			
    }	
    const onChangeMileagePoints  = (e) => {	
        dispatch(mainSliceActions.setMileagePoints(e.target.value)) 	
    }
    const onChangeSeats  = (e) => {	
            dispatch(mainSliceActions.setSeats(e.target.value)) 			
    }
    const onChangePrice = (e) => { 	
        dispatch(mainSliceActions.setPrice(e.target.value)) 			
    }
    const onChangeflightid = (e) => { 	
        dispatch(mainSliceActions.setFlightId(e.target.value)) 			
    }
    const onAddFlight = (data) => {
        dispatch(mainSliceActions.setFlightNumber(data.flightNumber))
        dispatch(mainSliceActions.setCarrier(data.carrier))     		
        dispatch(mainSliceActions.setOrigin(data.origin)) 				
        dispatch(mainSliceActions.setOriginCode(data.originCode)) 			
        dispatch(mainSliceActions.setDestination(data.destination)) 		
        dispatch(mainSliceActions.setDestinationCode(data.destinationCode)) 	
        dispatch(mainSliceActions.depDate(parseInt(data.depDate)))
		dispatch(mainSliceActions.depMonth(parseInt(data.depMonth)))
		dispatch(mainSliceActions.arrDate(parseInt(data.arrDate)))
		dispatch(mainSliceActions.arrMonth(parseInt(data.arrMonth)))
		dispatch(mainSliceActions.depYear(parseInt(data.depYear)))
		dispatch(mainSliceActions.depHrs(parseInt(data.depHrs)))
		dispatch(mainSliceActions.depMins(parseInt(data.depMins)))
		dispatch(mainSliceActions.arrHrs(parseInt(data.arrHrs)))
		dispatch(mainSliceActions.arrMins(parseInt(data.arrMins)))
		dispatch(mainSliceActions.arrYear(parseInt(data.arrYear)))        
        dispatch(mainSliceActions.setPrice(parseInt(data.price)) )
        dispatch(mainSliceActions.setCapacity(parseInt(data.capacity))) 			
        dispatch(mainSliceActions.setMileagePoints(parseInt(data.mileagePoints))) 
        dispatch(mainSliceActions.setTravelDistance(parseInt(data.travelDistance))) 
        dispatch(mainSliceActions.setFlightId(data._id))		
        
    }
	
	   const handleAddFlight = (e) => {
        e.preventDefault()

        const data = {
            flightNumber ,	
            carrier,	
            origin 	,		
            originCode 	,	
            destination 	,	
            destinationCode ,	
            depDate,
            depMonth,
            arrDate 	,
            arrMonth,
            depYear,
            depHrs,
            depMins,
            arrHrs,
            arrMins,
            arrYear,
            price 			,	
            capacity 		,	
            mileagePoints 	,
            travelDistance 	,
            flightid,
        }
		axios.defaults.withCredentials = true;
        console.log(data)     
        axios.post('http://localhost:3001/employee/addFlight', data)
            .then((response) => {
                console.log(response.headers)
                onAddFlight(response.data)
                printStatus(response)
            })
            .catch((err) => {
                console.log("Printing error")
                console.log(err)
                invalidAddFlight()
            })
    }
	const printStatus=(response)=>toast.error(response.data.message)
	const invalidAddFlight = () => toast.error('Flight Already Exists or Invalid Input')
	
    return (
        <div>
            <Toaster />
			<div className="container">
			<Container>
            <div>
			 <Row className="rows">
			 <Col>
            <Form id="addflight-form" method="post" onSubmit={handleAddFlight}> 
				<h1>Add FLight</h1>
                <p>Enter details to add a flight</p>


            	<Form.Group className="addflightbox" controlId="formFlightNumber"> 
                <Form.Control type="text" name="flightnumber" placeholder="Enter The Flight Number" onChange={onChangeFlightNumber} required /> 		
                </Form.Group>

                <Form.Group className="addflightbox" controlId="formCarrier"> 
                <Form.Control type="text" name="carrier" placeholder="Enter Carrier" onChange={onChangeCarrier} required /> 		
                </Form.Group>
				
	            <Form.Group className="addflightbox" controlId="formOrigin"> 
                <Form.Control type="text" name="origin" placeholder="Enter The Flight Origin" onChange={onChangeOrigin} required /> 					
                </Form.Group>
				
				<Form.Group className="addflightbox" controlId="formOriginCode"> 
				<Form.Control type="text" name="origincode" placeholder="Enter The Flight OriginCode" onChange={onChangeOriginCode} required /> 		
				</Form.Group>	
				
				<Form.Group className="addflightbox" controlId="formDestination"> 
				<Form.Control type="text" name="destination" placeholder="Enter The Flight formDestination" onChange={onChangeDestination} required /> 	
				</Form.Group>	
				
				<Form.Group className="addflightbox" controlId="formDestinationCode">
				<Form.Control type="text" name="destinationcode" placeholder="Enter The Flight DestinationCode" onChange={onChangeDestinationCode} required /> 
				</Form.Group>

                <Form.Group className="addflightbox" controlId="formdepDate">
				<Form.Control type="number" name="depdate" placeholder="Enter The Flight DepartureDate" onChange={onChangedepDate} required /> 	 
				</Form.Group>
				
				<Form.Group className="addflightbox" controlId="formdepMonth">
				<Form.Control type="number" name="depmonth" placeholder="Enter The Flight depmonth" onChange={onChangedepMonth} required /> 	
				</Form.Group>	
          
         
                <Form.Group className="addflightbox" controlId="formarrDate">
				<Form.Control type="number" name="arrdate" placeholder="Enter The Flight arrdate" onChange={onChangearrDate} required /> 	 
				</Form.Group>
				
				<Form.Group className="addflightbox" controlId="formarrMonth">
				<Form.Control type="number" name="arrmonth" placeholder="Enter The Flight arrmonth" onChange={onChangearrMonth} required /> 	
				</Form.Group>
                <Form.Group className="addflightbox" controlId="formdepYear">
				<Form.Control type="number" name="depyear" placeholder="Enter The Flight depyear" onChange={onChangedepYear} required /> 	 
				</Form.Group>
				
				<Form.Group className="addflightbox" controlId="formdepHrs">
				<Form.Control type="number" name="dephrs" placeholder="Enter The Flight dephrs" onChange={onChangedepHrs} required /> 	
				</Form.Group>
                <Form.Group className="addflightbox" controlId="formdepMins">
				<Form.Control type="number" name="depmins" placeholder="Enter The Flight depmins" onChange={onChangedepMins} required /> 	 
				</Form.Group>
				
				<Form.Group className="addflightbox" controlId="formarrHrs">
				<Form.Control type="number" name="arrhrs" placeholder="Enter The Flight arrhrs" onChange={onChangearrHrs} required /> 	
				</Form.Group>
                <Form.Group className="addflightbox" controlId="formarrMins">
				<Form.Control type="number" name="arrmins" placeholder="Enter The Flight arrmins" onChange={onChangearrMins} required /> 	 
				</Form.Group>
				
				<Form.Group className="addflightbox" controlId="formarrYear">
				<Form.Control type="number" name="arryear" placeholder="Enter The Flight arryear" onChange={onChangearrYear} required /> 	
				</Form.Group>

                <Form.Group className="addflightbox" controlId="formPrice"> 
				<Form.Control type="number" name="price" placeholder="Enter The Flight Price" onChange={onChangePrice} required /> 
				</Form.Group>	

				<Form.Group className="addflightbox" controlId="formCapacity">
				<Form.Control type="number" name="capacity" placeholder="Enter The Flight Capacity" onChange={onChangeCapacity} required /> 		
				</Form.Group>		
				

                <Form.Group className="addflightbox" controlId="formMileagePoints">
				<Form.Control type="number" name="mileagepoints" placeholder="Enter The Flight MileagePoints" onChange={onChangeMileagePoints} required /> 	 
				</Form.Group>
				
				<Form.Group className="addflightbox" controlId="formTravelDistance"> 
				<Form.Control type="number" name="traveldistance" placeholder="Enter The Flight TravelDistance" onChange={onChangeTravelDistance} required /> 	
				</Form.Group>
                <Button id="searchbutton"  type="submit">
				Add
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

export default AddFlight