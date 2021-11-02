import React, { Component } from 'react';
// import '../../App.css';
import { Link } from 'react-router-dom';
import './Navigationbar.css'
import {
    Navbar,  Nav, Button
} from 'react-bootstrap';

class Navigationbar extends Component {

    render() {
        const navLogin = (
            <Nav className="ml-auto">
                <Link
                    id="loginLink"
                    to={{
                        pathname: '/login',
                    }}
                >
                    <Button id="navbarlogin" className="mr-sm-2 navbarbuttons">
                        Login
                    </Button>
                </Link>

                <Link
                    id="signupLink"
                    to={{
                        pathname: '/signup',
                    }}
                >
                    <Button className="navbarbuttons">
                        Sign Up
                    </Button>
                </Link>
            </Nav>
        );

        return (
            <div>
                <Navbar id="nav-bar">
                    <div className="container">
                        <Navbar.Brand id="nav-brand">
                            <Link
                                id="dashboardLink"
                                to={{
                                    pathname: '/',
                                }}
                            >
                                Spartan Airlines
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        {navLogin}
                    </div>
                </Navbar>
            </div>
        );
    }
}


export default Navigationbar;
