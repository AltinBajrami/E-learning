import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Verify.scss';
import Logo from '../../../../assets/images/logo-no-background.png';

const Verify = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/sign-in');
  };

  return (
    <div className="verify-container">
      <div className="verify-info">
        <img src={Logo} alt="e-Learning Academy" className="logo" />
        <h2>Account Registered Successfully!</h2>
        <p>
          An email has been sent to your registered email address. Please check
          your email to verify your account.
        </p>
        <button className="btn-login" onClick={handleLoginClick}>
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Verify;
