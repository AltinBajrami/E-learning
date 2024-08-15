import React from 'react';
import PropTypes from 'prop-types';
import './FigmaHeader.scss';
import { BiArrowFromLeft } from 'react-icons/bi';

const FigmaHeader = ({ imgSrc, title, description, buttonLabel }) => {
  return (
    <div className='figma-container'>
      <div className="image" id='main'>
        <img src={imgSrc} alt="headerImg" />
        <div className="overlay"></div> 
      </div>
      <div className="centered">
        <h1>{title}</h1>
        <p>{description}</p>
        <button className='button'>{buttonLabel}<BiArrowFromLeft className='arrow'/></button>
      </div>
    </div>
  );
}

FigmaHeader.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default FigmaHeader;
