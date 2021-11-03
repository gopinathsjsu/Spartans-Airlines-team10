import React, { Suspense } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';

const LandingPage = React.lazy(() => import('./components/LandingPage/LandingPage'))
const SignUp = React.lazy(() => import('./components/Signup/Signup'))
const Login = React.lazy(() => import('./components/Login/Login'))
const CustomerLogin = React.lazy(() => import('./components/Login/CustomerLogin'))

function App() {
  return (
    <div className="App">
      <Suspense fallback={
        <div className='centered'>Loading...</div>
      }>
        <Route exact path="/" component={LandingPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/customerlogin" component={CustomerLogin} />
      </Suspense>
    </div>
  );
}

export default App;
