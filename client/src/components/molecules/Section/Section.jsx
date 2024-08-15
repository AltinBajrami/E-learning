import React from 'react';
import PropTypes from 'prop-types';
import './Section.scss';
import Button from '../../atoms/reusableButton/Button';

const Section = ({ title, description, buttonText, imgUrl, reverse }) => {
  return (
    <div className={`section-item ${reverse ? 'row-reverse' : 'row'}`}>
      <div className="section-text">
        <h2>{title}</h2>
        <p>{description}</p>
        <Button label={buttonText} />
      </div>
      <div className="section-image">
        <img src={imgUrl} alt={title} />
      </div>
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
};

Section.defaultProps = {
  reverse: false,
};

export default Section;
