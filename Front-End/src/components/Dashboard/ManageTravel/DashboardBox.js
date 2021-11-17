import { Tabs, Tab, Container } from 'react-bootstrap'
import BookFlight from './BookFlight'
import ManageBooking from './ManageBooking'
import './DashboardBox.css'

const DashboardBox = () => {
    return (
        <div>
            <Container>
                <h1 id="heading">Manage Travel</h1>
                <div id="tabs">
                    <Tabs defaultActiveKey="bookflight" className="mb-3">
                        <Tab eventKey="bookflight" title="Book Flight">
                            <BookFlight />
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