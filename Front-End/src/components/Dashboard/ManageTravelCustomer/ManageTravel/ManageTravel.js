import axios from "axios"
import { useEffect } from "react"

const ManageTravel = () => {

    useEffect(() => {
        getTravelInformation()
    })

    const getTravelInformation = async () => {
        const customerId = sessionStorage.getItem('customerId')
        const res = await axios.get(`http://localhost:3001/customer/getUpcomingCustomerReservations/${customerId}`)
        console.log(res)
    }


    return (
        <h1>Manage Travel</h1>
    )
}

export default ManageTravel