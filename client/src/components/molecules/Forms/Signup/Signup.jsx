import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../../../assets/images/logo-no-background.png';
import Navbar from '../../../organisms/Navbar/Navbar';
import Footer from '../../../organisms/Footer/Footer';
import InfoSection from '../InfoSection/InfoSection';

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({});
  };

  const handleBackLogin = () => {
    navigate('/Sign-in');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post('http://localhost:4000/api/v1/auth/register', { ...formData, role });
        toast.success('Registered successfully');
        navigate('/verify');
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <ToastContainer />
        <InfoSection />
        <div className="signup-form">
          <img src={Logo} alt="e-Learning Academy" className="logo" />
          <h2>Sign Up</h2>
          {!role ? (
            <div className="form-group">
              <label htmlFor="role">I am a:</label>
              <select id="role" name="role" onChange={handleRoleChange}>
                <option value="">Select Role</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
                <option value="student">Student</option>
              </select>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='form'>
              <div className="form-group">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                  required
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                  required
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
              {role === 'teacher' && (
                <>
                  <div className="form-group">
                    <input
                      type="text"
                      id="topic"
                      name="topic"
                      placeholder="Teaching topic"
                      value={formData.topic || ''}
                      onChange={handleChange}
                      required
                    />
                    {errors.topic && (
                      <span className="error-message">{errors.topic}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      id="experience"
                      name="experience"
                      placeholder="Years of experience"
                      value={formData.experience || ''}
                      onChange={handleChange}
                      required
                    />
                    {errors.experience && (
                      <span className="error-message">{errors.experience}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <select
                      id="subject"
                      name="subject"

                      value={formData.subject || ''}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Subject</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="history">History</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                    </select>
                    {errors.subject && (
                      <span className="error-message">{errors.subject}</span>
                    )}
                  </div>
                </>
              )}

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email || ''}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group">
                <input
                  type={passwordShown ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password || ''}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
                <button
                  type="button"
                  className="show-password"
                  onClick={togglePasswordVisibility}
                >
                  {passwordShown ? '🙈' : '👁️'}
                </button>
              </div>
              <div className="form-group">
                <input
                  type={passwordShown ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword || ''}
                  onChange={handleChange}
                  required
                />
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>
              <div className='sign-up-buttons'>
                <button type="submit" className="btn-signup">
                  Sign Up
                </button>
                <button
                  type="button"
                  className="btn-back"
                  onClick={handleBackLogin}
                >
                  Go Back to Login
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
