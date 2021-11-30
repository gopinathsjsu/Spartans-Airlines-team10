import axios from "axios"
import { useEffect } from "react"

const UpcomingTravel = () => {

    useEffect(() => {
        getTravelInformation()
    })

    const getTravelInformation = async () => {
        const customerId = sessionStorage.getItem('customerId')
        const res = await axios.get(`http://localhost:3001/customer/getUpcomingCustomerFlights/${customerId}`)
        console.log(res)
    }


    return (
        <h1>UpcomingTravel</h1>
    )
}

export default UpcomingTravel