import { Tabs, Tab, Container } from 'react-bootstrap'
import SearchFlight from './SearchFlight'
import UpcomingTravel from './ManageBooking/UpcomingTravel'
import TravelHistory from './ManageBooking/TravelHistory'
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
                        <Tab eventKey="upcomingtravel" title="Upcoming Travel">
                            <UpcomingTravel />
                        </Tab>
                        <Tab eventKey="travelhistory" title="Travel History">
                            <TravelHistory />
                        </Tab>
                    </Tabs>
                </div>
            </Container>
        </div>
    )
}

export default DashboardBox