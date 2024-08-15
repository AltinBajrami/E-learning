import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';
import Navbar from '../../../organisms/Navbar/Navbar';
import Footer from '../../../organisms/Footer/Footer';
import InfoSection from '../InfoSection/InfoSection';
import customFetch from '../../../utilities/customFetch';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customFetch.post('/auth/login', formData)
      navigate('/dashboard');
      toast.success('Successfully logged in')
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error);
    }
  };

  const handleSignupClick = () => {
    navigate('/Sign-up');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <ToastContainer />
        <InfoSection />
        <div className="login-form">
          {/* <img src={Logo} alt="e-Learning Academy" className="logo" /> */}
          <h2>Let's Sign You In</h2>
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type={passwordShown ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="show-password"
                onClick={togglePasswordVisibility}
              >
                {passwordShown ? '🙈' : '👁️'}
              </button>
            </div>
            <a className="forgot-password" onClick={handleForgotPassword}>
              Forgot password?
            </a>
            <button type="submit" className="btn-login">
              Login
            </button>
            <div className="alternative-login">
              <p>Or login with</p>
              <button type="button" className="btn-google">
                Google
              </button>
            </div>
            <p className="signup">
              Don't have an account? <a onClick={handleSignupClick}>Sign up</a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
