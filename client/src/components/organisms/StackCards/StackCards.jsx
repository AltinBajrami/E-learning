import React from "react";
import { useNavigate } from "react-router-dom";
import "../../organisms/StackCards/StackCards.scss";

import RightArrowIcon from "./RightArrowIcon";
import "./StackCards.scss";

const StackCards = () => {
  const navigate = useNavigate();

  const handleExploreClick = (event) => {
    event.preventDefault();
    navigate("/certifications");
  };

  return (
    <div className="cards">
      <div className="card">
        <h2 className="card-title">IT and Software</h2>
        <div>
          <div className="shadow">
            <p className="text">
              AWS Certification <RightArrowIcon />
            </p>
          </div>
          <div className="shadow">
            <p className="text">
              Ethical Hacking <RightArrowIcon />
            </p>
          </div>
          <div className="shadow">
            <p className="text">
              Cyber Security <RightArrowIcon />
            </p>
          </div>
        </div>
        <a href="/ceritfications" onClick={handleExploreClick} className="card-button">
          <span>Explore</span>
        </a>
      </div>
      <div className="card">
        <h2 className="card-title">IT and Software</h2>
        <div>
          <div className="shadow">
            <p className="text">
              AWS Certification <RightArrowIcon />
            </p>
          </div>
          <div className="shadow">
            <p className="text">
              Ethical Hacking <RightArrowIcon />
            </p>
          </div>
          <div className="shadow">
            <p className="text">
              Cyber Security <RightArrowIcon />
            </p>
          </div>
        </div>
        <a href="/ceritfications" onClick={handleExploreClick} className="card-button">
          <span>Explore</span>
        </a>
      </div>
      <div className="card">
        <h2 className="card-title">IT and Software</h2>
        <div>
          <div className="shadow">
            <p className="text">
              AWS Certification <RightArrowIcon />
            </p>
          </div>
          <div className="shadow">
            <p className="text">
              Ethical Hacking <RightArrowIcon />
            </p>
          </div>
          <div className="shadow">
            <p className="text">
              Cyber Security <RightArrowIcon />
            </p>
          </div>
        </div>
        <a href="/ceritfications" onClick={handleExploreClick} className="card-button">
          <span>Explore</span>
        </a>
      </div>
    </div>
  );
};

export default StackCards;
