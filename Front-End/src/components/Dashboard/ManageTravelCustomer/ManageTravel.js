import Navigationbar from '../../Navigationbar/Navigationbar'
import DashboardBox from './DashboardBox'
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';

const ManageTravel = () => {
    const loadedCookie = cookie.load('cookie')

    return (
        <div>
            {!loadedCookie ? <Redirect to="/" /> : null}
            <Navigationbar />
            <DashboardBox />
        </div>
    )
}

export default ManageTravel