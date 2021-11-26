import { Tabs, Tab, Container } from 'react-bootstrap'
import SearchFlight from './SearchFlight'
import ManageBooking from './ManageBooking'
import './DashboardBox.css'

const DashboardBox = () => {
    return (
        <div>
            <Container>
                <h1 id="heading">Manage Travel</h1>
                <div id="tabs">
                    <Tabs defaultActiveKey="searchflight" className="mb-3">
                        <Tab eventKey="searchflight" title="Search Flight">
                            <SearchFlight />
                        </Tab>
                        <Tab eventKey="managebooking" title="Manage Booking">
                            <ManageBooking />
                        </Tab>
                    </Tabs>
                </div>
            </Container>
        </div>
    )
}

export default DashboardBox