import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import InfoSection from '../InfoSection/InfoSection';
import Logo from '../../../../assets/images/logo-no-background.png';
import Navbar from '../../../organisms/Navbar/Navbar';
import Footer from '../../../organisms/Footer/Footer';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showSendCodeButton, setShowSendCodeButton] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setShowSendCodeButton(emailValue.length > 0);
    validateEmail(emailValue);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!re.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSendCode = async () => {
    if (emailError || !email) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/auth/forgot-password',
        {
          email,
        }
      );
      toast.success('Please check your email for more info');
      return navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error sending email');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // call it initially
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Navbar />
      <div className="resetpassword-container">
        <InfoSection />
        <div className="reset-form">
          <img src={Logo} alt="e-Learning Academy" className="logo" />
          <h2>Reset Your Password</h2>
          {emailError && <span className="error-message">{emailError}</span>}
          <form>
            <div className={`form-group ${isMobile ? 'below-input' : ''}`}>
              <input
                type="email"
                id="reset-email"
                name="reset-email"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {showSendCodeButton && !isMobile && (
                <button
                  type="button"
                  className="send-code-button"
                  onClick={handleSendCode}
                >
                  Send Code
                </button>
              )}
            </div>
            {showSendCodeButton && isMobile && (
              <button
                type="button"
                className="send-code-button"
                onClick={handleSendCode}
              >
                Send Code
              </button>
            )}
          </form>
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate('/Sign-in')}
          >
            Back to Login
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
