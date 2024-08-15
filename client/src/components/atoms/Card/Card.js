import React from 'react';
import './Card.scss';

const Card = ({ title, description, imageSrc, onCardClick }) => {
    return (
        <div className="single-card" onClick={onCardClick}>
            <img src={imageSrc} alt={title} className="card-image" />
            <div className='info'>
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
            </div>
        </div>
    );
};

export default Card;
