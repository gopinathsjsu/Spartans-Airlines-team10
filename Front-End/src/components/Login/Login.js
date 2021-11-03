import Navigationbar from '../Navigationbar/Navigationbar'
import {
    Form, Button, Container, Col, Row, Figure
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Login.css'

const Login = () => {
    return (
        <div>
            <Navigationbar />
            <div className="container">
                <Container>
                    <div>
                        <Row>
                            <Col>
                                <Figure.Image
                                    src={`${window.location.origin}/login.svg`}
                                />
                            </Col>
                            <Col>
                                <Form id="login-box" method="post">
                                    <h1>Are you a customer ?</h1>
                                    <Link
                                        id="customerLoginLink"
                                        to={{
                                            pathname: '/customerlogin',
                                        }}
                                    ><Button className="loginbutton" type="submit">
                                            Customer Login
                                    </Button></Link>
                                    <h1>Are you an employee ?</h1>
                                    <Link
                                        id="employeeLoginLink"
                                        to={{
                                            pathname: '/employeelogin',
                                        }}
                                    ><Button className="loginbutton" type="submit">
                                        Employee Login
                                    </Button></Link>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Login