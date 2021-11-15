import React, { Component } from 'react';
// import '../../App.css';
import { Link } from 'react-router-dom';
import './Navigationbar.css'
import {
    Navbar, Nav, Button,
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
                ><Button id="navbarchart" className="mr-sm-2 navbarbuttons">Login
                    </Button></Link>

                <Link
                    id="signUpLink"
                    to={{
                        pathname: '/signup',
                    }}
                ><Button id="navbarchart" className="mr-sm-2 navbarbuttons">Sign Up
                    </Button></Link>
		    
		    
				<Link
                    id="profilepageLink"
                    to={{
                        pathname: '/profile',
                    }}
                >
                    <Button id="navbarchart" className="mr-sm-2 navbarbuttons">
                        Profile
                    </Button>
                </Link>
            </Nav>
        );
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


export default Navigationbar;
