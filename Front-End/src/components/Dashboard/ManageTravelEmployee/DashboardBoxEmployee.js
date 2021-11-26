import { Tabs, Tab, Container } from 'react-bootstrap'
import AddFlight from './AddFlight'
import EditFlight from './EditFlight'
import CancelFlight from './CancelFlight'
//import ManageBookingEmployee from './ManageBookingEmployee'
import './DashboardBoxEmployee.css'

const DashboardBoxEmployee = () => {
    return (
        <div>
            <Container>
                <h1 id="heading">Manage Travel Employee</h1>
                <div id="tabs">
                    <Tabs defaultActiveKey="Addflight" className="mb-3">
                        <Tab eventKey="Addflight" title="Add Flight">
                            <AddFlight />
                        </Tab>
                        {/* <Tab eventKey="managebooking" title="Manage Booking Employee">
                            <ManageBookingEmployee />
                        </Tab> */}
                    </Tabs>
                </div>
                <div id="tabs">
                    <Tabs defaultActiveKey="Editflight" className="mb-3">
                        <Tab eventKey="Editflight" title="Edit Flight">
                            <AddFlight />
                        </Tab>
                    </Tabs>
                </div>
                <div id="tabs">
                    <Tabs defaultActiveKey="Cancelflight" className="mb-3">
                        <Tab eventKey="CAncelflight" title="Cancel Flight">
                            <AddFlight />
                        </Tab>
                    </Tabs>
                </div>
            </Container>
        </div>
    )
}

export default DashboardBoxEmployee