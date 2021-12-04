import {
    Container, ListGroup
} from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EditFlightInformation from './EditFlightInformation'
import './EditFlight.css';
import "react-datepicker/dist/react-datepicker.css";



const EditFlight = () => {
    const [allFlightInformation, setAllFlightInformation] = useState([])

    useEffect(() => {
        const getAllFlightInformation = async () => {
            const employeeID = sessionStorage.getItem('employeeId')
            const res = await axios.get(`http://18.144.101.175:3001/employee/getUpcomingFlights/${employeeID}`)
            const allFlights = res.data.response

            console.log(allFlights)
    
            const data = allFlights.map((individualData) => {
                return <ListGroup.Item key={individualData._id} style={{textAlign:'left', marginBottom:'10px', borderWidth:'2px'}}><EditFlightInformation individualData={individualData} /></ListGroup.Item>
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

export default EditFlight