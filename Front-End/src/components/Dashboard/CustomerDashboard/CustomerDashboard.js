import Navigationbar from '../../Navigationbar/Navigationbar'
import DashboardCarousel from './DashboardCarousel'
// import cookie from 'react-cookies';

const Dashboard = () => {
    // const loadedCookie = cookie.load('cookie')

    return (
        <div>
            <Navigationbar />
            <DashboardCarousel />
        </div>
    )
}

export default Dashboard