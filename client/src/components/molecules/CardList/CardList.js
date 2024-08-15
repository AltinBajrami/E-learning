import React from "react";
import Card from "../../atoms/Card/Card";
import '../../molecules/CardList/CardList.scss';

const CardList = ({services, onCardClick}) => {
    return (
        <div className="card-list">
            {services.map((service, index) => (
                <Card key={index} {...service} onCardClick={() => onCardClick(service.link)} />
            ))}
        </div>
    );
};

export default CardList;
