import {
    Container, ListGroup
} from 'react-bootstrap';
import { useState, useEffect} from 'react'
import axios from 'axios';
import CancelFlightInformation from './CancelFlightInformation'
import './CancelFlight.css';
import "react-datepicker/dist/react-datepicker.css";



const CancelFlight = () => {
    const [allFlightInformation, setAllFlightInformation] = useState([])

    useEffect(() => {
        const getAllFlightInformation = async () => {
            const employeeID = sessionStorage.getItem('employeeId')
            const res = await axios.get(`http://18.144.101.175:3001/employee/getUpcomingFlights/${employeeID}`)
            const allFlights = res.data.response

            console.log(allFlights)
    
            const data = allFlights.map((individualData) => {
                return <ListGroup.Item key={individualData._id} style={{textAlign:'left', marginBottom:'10px', borderWidth:'2px'}}><CancelFlightInformation individualData={individualData} /></ListGroup.Item>
            })
    
            setAllFlightInformation(data)
        }

        getAllFlightInformation()
    }, [])
    
    return (
        <div className="container">
            <Container>
                <div>
                <ListGroup style={{marginLeft:'10px', marginRight:'10px', marginBottom:'10px'}}>
                    {allFlightInformation.length > 0 ? allFlightInformation : <h3>No Flights Created</h3>}
                </ListGroup>   
                </div>
            </Container>
        </div>
    )
}

export default CancelFlight