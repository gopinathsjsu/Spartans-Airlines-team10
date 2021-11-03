import Navigationbar from '../Navigationbar/Navigationbar'
import {
  Container, Row, Col, Figure,
} from 'react-bootstrap';
import './Landingpage.css'

function LandingPage() {

  return (
    <div className="App">
      <Navigationbar />
      <div className="container">
        <div className="description">
          <Container>
            <div>
              <Row>
                <Col>
                  <div id="landingpagecaption">
                    <h1> Explore, Discover </h1>
                    <br />
                    <h1>and Save</h1>
                    <br />
                  </div>
                </Col>
                <Col>
                  <Figure.Image
                    src={`${window.location.origin}/landingpage.svg`}
                  />
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
