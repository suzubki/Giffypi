import React from "react";
import PropTypes from 'prop-types'

// React slick (carousel)
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Reactstrap
import { Card } from "reactstrap";

// CSS
import "./CardGif.css";

export const CardGif = ({ objectData }) => {

  let { data, loading } = objectData

  // Slick settings
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "10px",
    initialSlide: 0,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Render card gif
  return (
    <>
      <Slider {...settings}>
        {
        loading && data.map((gif) => (
            <Card key={gif.id}>
              <img
                alt="Card cap"
                className="card_image--margin"
                src={gif.images.original.url}
                width="90%"
              />
            </Card>
        ))}
      </Slider>
    </>
  );
};


CardGif.propTypes = {
  objectData: PropTypes.object.isRequired
}

CardGif.defaultProps = {
  objectData: {data: [], loading: Boolean}
}

export default CardGif;
