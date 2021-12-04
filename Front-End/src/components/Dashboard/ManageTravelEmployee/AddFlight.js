import {
    Form, Button, Container, Col, Row
} from 'react-bootstrap';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { mainSliceActions } from '../../../store/mainSlice';
import './AddFlight.css';
import "react-datepicker/dist/react-datepicker.css";
import './Form.css'



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
    const onChangeTravelDistance  = (e) => {
        dispatch(mainSliceActions.setTravelDistance(e.target.value)) 	
    }
    const onChangeMileagePoints  = (e) => {	
        dispatch(mainSliceActions.setMileagePoints(e.target.value)) 	
    }
    const onChangePrice = (e) => { 	
        dispatch(mainSliceActions.setPrice(e.target.value)) 			
    }
    const onAddFlight = (data) => {
        dispatch(mainSliceActions.setFlightNumber(data.flightNumber))
        dispatch(mainSliceActions.setCarrier(data.carrier))     		
        dispatch(mainSliceActions.setOrigin(data.origin)) 				
        dispatch(mainSliceActions.setOriginCode(data.originCode)) 			
        dispatch(mainSliceActions.setDestination(data.destination)) 		
        dispatch(mainSliceActions.setDestinationCode(data.destinationCode)) 	
        dispatch(mainSliceActions.setdepDate(parseInt(data.depDate)))
		dispatch(mainSliceActions.setdepMonth(parseInt(data.depMonth)))
		dispatch(mainSliceActions.setarrDate(parseInt(data.arrDate)))
		dispatch(mainSliceActions.setarrMonth(parseInt(data.arrMonth)))
		dispatch(mainSliceActions.setdepYear(parseInt(data.depYear)))
		dispatch(mainSliceActions.setdepHrs(parseInt(data.depHrs)))
		dispatch(mainSliceActions.setdepMins(parseInt(data.depMins)))
		dispatch(mainSliceActions.setarrHrs(parseInt(data.arrHrs)))
		dispatch(mainSliceActions.setarrMins(parseInt(data.arrMins)))
		dispatch(mainSliceActions.setarrYear(parseInt(data.arrYear)))        
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
        }
		axios.defaults.withCredentials = true;
        console.log(data)     
        axios.post('http://18.144.101.175:3001/employee/addFlight', data)
            .then((response) => {
                console.log(response.headers)
                onAddFlight(response.data)
            })
            .catch((err) => {
                console.log("Printing error")
                console.log(err)
                invalidAddFlight()
            })
    }
	const invalidAddFlight = () => toast.error('Flight Already Exists or Invalid Input')
	
    return (
        <div>
            <Toaster />
			<div className="container">
			<Container>
            <div className="form-box">
            <Form id="addflight-form" method="post" onSubmit={handleAddFlight}> 
                <p>Enter details to add a flight</p>
                <Row className="rows">
                    <Col>
                        <Form.Group className="addflightbox" controlId="formFlightNumber"> 
                            <Form.Control type="text" name="flightnumber" placeholder="Enter the Flight Number" onChange={onChangeFlightNumber} required /> 		
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="addflightbox" controlId="formCarrier"> 
                            <Form.Control type="text" name="carrier" placeholder="Enter the Flight Carrier" onChange={onChangeCarrier} required /> 		
                        </Form.Group>
                    </Col>   
                </Row>
            	<Row className="rows">
                    <Col>
                        <Form.Group className="addflightbox" controlId="formOrigin"> 
                            <Form.Control type="text" name="origin" placeholder="Enter the Flight Origin" onChange={onChangeOrigin} required /> 					
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="addflightbox" controlId="formOriginCode"> 
				            <Form.Control type="text" name="origincode" placeholder="Enter the Flight Origin Code" onChange={onChangeOriginCode} required /> 		
				        </Form.Group>
                    </Col>
                </Row>
                <Row className="rows">
                    <Col>
                        <Form.Group className="addflightbox" controlId="formDestination"> 
				            <Form.Control type="text" name="destination" placeholder="Enter the Flight Destination" onChange={onChangeDestination} required /> 	
				        </Form.Group>	
                    </Col>
                    <Col>
                        <Form.Group className="addflightbox" controlId="formDestinationCode">
				            <Form.Control type="text" name="destinationcode" placeholder="Enter the Flight Destination Code" onChange={onChangeDestinationCode} required /> 
				        </Form.Group>
                    </Col>
                </Row>
                <Row className="rows">
                    <Col>
                        <Form.Group className="addflightbox" controlId="formdepDate">
				            <Form.Control type="number" name="depdate" placeholder="Enter the Flight Departure Date" onChange={onChangedepDate} required /> 	 
				        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="addflightbox" controlId="formarrDate">
				            <Form.Control type="number" name="arrdate" placeholder="Enter the Flight Arrival Date" onChange={onChangearrDate} required /> 	 
				        </Form.Group>
                    </Col>
                    
                </Row>
                <Row className="rows">
                    <Col>
                        <Form.Group className="addflightbox" controlId="formdepYear">
				            <Form.Control type="number" name="depyear" placeholder="Enter the Flight Departure Year" onChange={onChangedepYear} required /> 	 
				        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="addflightbox" controlId="formarrYear">
				            <Form.Control type="number" name="arryear" placeholder="Enter the Flight Arrival Year" onChange={onChangearrYear} required /> 	
				        </Form.Group>
                    </Col>
                </Row>
				<Row className="rows">
                <Col>
                        <Form.Group className="addflightbox" controlId="formdepMonth">
				            <Form.Control type="number" name="depmonth" placeholder="Enter the Flight Departure Month" onChange={onChangedepMonth} required /> 	
				        </Form.Group>	
                    </Col>
                    <Col>
                        <Form.Group className="addflightbox" controlId="formarrMonth">
				            <Form.Control type="number" name="arrmonth" placeholder="Enter the Flight Arrival Month" onChange={onChangearrMonth} required /> 	
				        </Form.Group>
                    </Col>
                    
                </Row>
                <Row className="rows">
                    <Col>
                        <Form.Group className="addflightbox" controlId="formdepHrs">
				            <Form.Control type="number" name="dephrs" placeholder="Enter the Flight Departure Hours" onChange={onChangedepHrs} required /> 	
				        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="addflightbox" controlId="formarrHrs">
				            <Form.Control type="number" name="arrhrs" placeholder="Enter the Flight Arrival Hours" onChange={onChangearrHrs} required /> 	
				        </Form.Group>
                    </Col>
                </Row>
                <Row className="rows">
                    <Col>
                        <Form.Group className="addflightbox" controlId="formdepMins">
				            <Form.Control type="number" name="depmins" placeholder="Enter the Flight Departure Minutes" onChange={onChangedepMins} required /> 	 
				        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="addflightbox" controlId="formarrMins">
				            <Form.Control type="number" name="arrmins" placeholder="Enter the Flight Arrival Minutes" onChange={onChangearrMins} required /> 	 
				        </Form.Group>
                    </Col>
                    
                </Row>
                <Row className="rows">
                    <Col>
                        <Form.Group className="addflightbox" controlId="formPrice"> 
				            <Form.Control type="number" name="price" placeholder="Enter the Flight Price" onChange={onChangePrice} required /> 
				        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="addflightbox" controlId="formCapacity">
				            <Form.Control type="number" name="capacity" placeholder="Enter the Flight Capacity" onChange={onChangeCapacity} required /> 		
				        </Form.Group>
                    </Col>
                </Row>
                <Row className="rows">
                    <Col>
                        <Form.Group className="addflightbox" controlId="formMileagePoints">
				            <Form.Control type="number" name="mileagepoints" placeholder="Enter the Flight Mileage Points" onChange={onChangeMileagePoints} required /> 	 
				        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="addflightbox" controlId="formTravelDistance"> 
				            <Form.Control type="number" name="traveldistance" placeholder="Enter the Flight Travel Distance" onChange={onChangeTravelDistance} required /> 	
				        </Form.Group>
                    </Col>
                </Row>
                <br/>
                <Button id="searchbutton"  type="submit">
				    ADD
				</Button>
			</Form>
            </div>
            </Container>
        </div>
        </div>
    )
}

export default AddFlight