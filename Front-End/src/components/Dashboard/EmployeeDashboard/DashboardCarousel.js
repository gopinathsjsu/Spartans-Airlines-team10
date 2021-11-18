import { Carousel, Container } from 'react-bootstrap'
import './DashboardCarousel.css'

const DashboardCarousel = () => {
    return (
        <div>
            <Container>
                <div id="carousel">
                    <Carousel fade>
                        <Carousel.Item className="carouselitem">
                            <img
                                className="d-block w-100 carouselimage"
                                src={`${window.location.origin}/carouselimage1.jpg`}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>EXPLORE THE WORLD WITH US</h3>
                                <p>Fly with us to see the corners of the world</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item className="carouselitem">
                            <img
                                className="d-block w-100 carouselimage"
                                src={`${window.location.origin}/carouselimage2.jpg`}
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>SAFETY COMES FIRST</h3>
                                <p>We value safety of our employees</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item className="carouselitem">
                            <img
                                className="d-block w-100 carouselimage"
                                src={`${window.location.origin}/carouselimage3.jpg`}
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>WINTER IS COMING !</h3>
                                <p>Book your flights soon</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </Container>
        </div>
    )
}

export default DashboardCarousel