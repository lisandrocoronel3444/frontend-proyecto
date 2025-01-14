import "./Banner.css"

import { Container } from "react-bootstrap";
const Banner = () => {
    return (
        <div className="banner-container">
        <img
          src="https://cdn.pixabay.com/photo/2015/05/31/11/23/table-791167_640.jpg"
          className="banner-image"
        />
        <Container className="banner-text">
          <h1>Bienvenidos a Don Pedro</h1>
          <p>Disfruta de nuestros deliciosos platillos en un ambiente único.</p>
        </Container>
      </div>
    );
};

export default Banner;