import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navigationbar.css'
import {
    Navbar, Nav, Button,
} from 'react-bootstrap';
import OffCanvas from './OffCanvas'

class Navigationbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    render() {
        let navLogin = null
        if (sessionStorage.getItem('customerId') || sessionStorage.getItem('employeeId')) {
            navLogin = (
                <Nav className="ml-auto">
                    <OffCanvas />
                </Nav>
            );
        } else {
            navLogin = (
                <Nav className="ml-auto">

                    <Link
                        id="loginLink"
                        to={{
                            pathname: '/login',
                        }}
                    ><Button id="navbarchart" className="mr-sm-2 navbarbuttons">Login
                        </Button></Link>

                    <Link
                        id="signUpLink"
                        to={{
                            pathname: '/signup',
                        }}
                    ><Button id="navbarchart" className="mr-sm-2 navbarbuttons">Sign Up
                        </Button></Link>
                </Nav>
            );
        }
        return (
            <div>
                <Navbar id="nav-bar">
                    <div className="container">
                        <Navbar.Brand id="nav-brand">
                            <img
                                alt=""
                                src={`${window.location.origin}/san-jose-state-university-icon.png`}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />
                            {' '}
                            <Link
                                id="landingPageLink"
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


export default Navigationbar
