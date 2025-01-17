import React from 'react';
import './Button.scss';
const Button = ({ children, onClick }) => (
  <button className="custom-button" onClick={onClick}>
    {children}
  </button>
);

export default Button;
