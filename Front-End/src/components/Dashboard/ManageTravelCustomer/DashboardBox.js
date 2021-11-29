import { Tabs, Tab, Container } from 'react-bootstrap'
import SearchFlight from './SearchFlight'
import ManageTravel from './ManageTravel/ManageTravel'
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
                        <Tab eventKey="managetravel" title="Manage Travel">
                            <ManageTravel />
                        </Tab>
                    </Tabs>
                </div>
            </Container>
        </div>
    )
}

export default DashboardBox