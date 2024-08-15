import React from "react";
import Slider from "react-slick";
import "./Testimonials.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    role: "DevOps Engineer",
    name: "Brooklyn Simmons",
    imgSrc: "/elegant-touching-reading-concentrated-.png", 
  },
  {
    role: "Ethical Hacking Member",
    name: "Selena Murphy",
    imgSrc: "/portrait-young-woman-holding-her-folder.png", 
  },
  {
    role: "Financial Analysis Member",
    name: "Jacob Jones",
    imgSrc: "/man-with-blank-.png",
  },
  {
    role: "Web Development Member",
    name: "Patricia Sanantha",
    imgSrc: "/front-view-beautiful-smiling-woman-1.png", 
  },
];

const NextArrow = ({ onClick }) => {
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      &rarr;
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      &larr;
    </div>
  );
};

const Testimonials = () => {
  const settings = {
    dots: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          dots:false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          dots:true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="testimonials">
      <div className="title">
        <h1>
          Our member
          <br />
          experience
        </h1>
        <h4 className="title-description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur
          amet beatae nesciunt.
        </h4>
      </div>
      <Slider {...settings} className="testimonial-cards">
        {testimonials.map((testimonial, index) => (
          <div className={`testimonial-card ${testimonial.position}`} key={index}>
            <div className="testimonial-content">
              <h3>{testimonial.role}</h3>
              <h4>{testimonial.name}</h4>
              {testimonial.description && <p>{testimonial.description}</p>}
            </div>
            <img src={testimonial.imgSrc} alt={testimonial.name} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
