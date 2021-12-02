import Navigationbar from '../../Navigationbar/Navigationbar'
import DashboardCarousel from './DashboardCarousel'
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
    const loadedCookie = cookie.load('cookie')

    return (
        <div>
            {!loadedCookie ? <Redirect to="/" /> : null}
            <Navigationbar />
            <DashboardCarousel />
        </div>
    )
}

export default Dashboard