import axios from "axios"
import { useEffect } from "react"

const TravelHistory = () => {

    useEffect(() => {
        getTravelInformation()
    })

    const getTravelInformation = async () => {
        const customerId = sessionStorage.getItem('customerId')
        const res = await axios.get(`http://localhost:3001/customer/getCompletedCustomerFlights/${customerId}`)
        console.log(res)
    }


    return (
        <h1>Travel History</h1>
    )
}

export default TravelHistory