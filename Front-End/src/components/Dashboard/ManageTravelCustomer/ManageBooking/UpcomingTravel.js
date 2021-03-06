import axios from "axios"
import { useEffect, useState } from "react"
import TravelInformation from './TravelInformation'
import {ListGroup} from 'react-bootstrap'

const UpcomingTravel = () => {
    const [upcomingTravelInformation, setUpcomingTravelInformation] = useState([])

    useEffect(() => {
        const getTravelInformation = async () => {
            const customerId = sessionStorage.getItem('customerId')
            const res = await axios.get(`http://18.144.101.175:3001/customer/getUpcomingCustomerFlights/${customerId}`)
            const upcomingTravel = res.data.response
    
            const data = upcomingTravel.map((individualData) => {
                return <ListGroup.Item key={individualData._id} style={{textAlign:'left', marginBottom:'10px', borderWidth:'2px'}}><TravelInformation individualData={individualData} /></ListGroup.Item>
            })
    
            setUpcomingTravelInformation(data)
        }

        getTravelInformation()
    }, [])

    


    return (
        <div>
            <ListGroup style={{marginLeft:'10px', marginRight:'10px', marginBottom:'10px'}}>
                {upcomingTravelInformation.length > 0 ? upcomingTravelInformation : <h3>No Upcoming Travel</h3>}
            </ListGroup>
        </div>
    )
}

export default UpcomingTravel