import axios from "axios"
import { useEffect, useState } from "react"
import TravelHistoryInformation from './TravelHistoryInformation'
import { ListGroup } from 'react-bootstrap'

const TravelHistory = () => {
    const [travelHistoryInformation, setTravelHistoryInformation] = useState([])

    useEffect(() => {
        const getTravelInformation = async () => {
            const customerId = sessionStorage.getItem('customerId')
            const res = await axios.get(`http://18.144.101.175:3001/customer/getCompletedCustomerFlights/${customerId}`)
            
            const travelHistory = res.data.response
    
            const data = travelHistory.map((individualData) => {
                return <ListGroup.Item key={individualData._id} style={{textAlign:'left', marginBottom:'10px', borderWidth:'2px'}}><TravelHistoryInformation individualData={individualData} /></ListGroup.Item>
            })
    
            setTravelHistoryInformation(data)
        }

        getTravelInformation()
    }, [])

    


    return (
        <ListGroup style={{marginLeft:'10px', marginRight:'10px', marginBottom:'10px'}}>
                {travelHistoryInformation.length > 0 ? travelHistoryInformation : <h3>No Travel History</h3>}
        </ListGroup>
    )
}

export default TravelHistory