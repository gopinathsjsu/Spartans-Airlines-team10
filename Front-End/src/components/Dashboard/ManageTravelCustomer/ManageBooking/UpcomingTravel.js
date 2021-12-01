import axios from "axios"
import { useEffect, useState } from "react"
import TravelInformation from './TravelInformation'
import {ListGroup} from 'react-bootstrap'

const UpcomingTravel = () => {
    const [upcomingTravelInformation, setUpcomingTravelInformation] = useState([])

    useEffect(() => {
        const getTravelInformation = async () => {
            const customerId = sessionStorage.getItem('customerId')
            const res = await axios.get(`http://localhost:3001/customer/getUpcomingCustomerFlights/${customerId}`)
            const upcomingTravel = res.data.response
    
            const data = upcomingTravel.map((individualData) => {
                return <ListGroup.Item style={{textAlign:'left'}}><TravelInformation individualData={individualData} /></ListGroup.Item>
            })
    
            setUpcomingTravelInformation(data)
        }

        getTravelInformation()
    }, [])

    


    return (
        <div>
            <ListGroup style={{marginLeft:'10px', marginRight:'10px', marginBottom:'10px'}}>
                {upcomingTravelInformation}
            </ListGroup>
        </div>
    )
}

export default UpcomingTravel