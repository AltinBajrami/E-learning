import React, { useState } from 'react';
import Footer from '../../organisms/Footer/Footer';
import Navbar from '../../organisms/Navbar/Navbar';
import './Contact.scss';
import Logo from '../../../assets/images/logo-no-background.png';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', description: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/contact', formData);
      setMessage(response.data.message);
      setIsError(false);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
      setIsError(true);
    }
  };

  return (
    <>
      <Navbar />
      <section className="contact">
        <div className="contact-top"></div>
        <div className="contact-bottom">
          <div className="container-contact">
            <div className="contact-titles">
              <h4>Contact us</h4>
              <h2>Get In Touch</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi molestiae tempora natus harum.
                Culpa fugiat tempore illo quidem perferendis aspernatur ullam quis atque vitae autem.
              </p>
            </div>
            <div className="contact-elements">
              <div className='left'>
                <form className="contact-form" onSubmit={handleSubmit}>
                <div>
                  <label>
                    Your Name
                    <span>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>
                    Your email
                    <span>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>
                    Description
                    <span>*</span>
                  </label>
                  <textarea
                    name="description"
                    size="30"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button className="form-button">Send Message</button>
              </form>
              <div className="message-container">
                {message && (
                  <p className={isError ? 'error-message' : 'success-message'}>{message}</p>
                )}
              </div>
              </div>
              
              <div className="contact-info">
                <div className="contact-info-item">
                  <div className="contact-info-texts">
                    <img src={Logo} alt="logo-academy" className="logo-academy"/>
                    <p className="contact-street">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      repellendus quod doloribus vitae ullam.
                    </p>
                    <a href="tel:Phone: +1 1234 567 88">Phone: +1 1234 567 88</a>
                    <a href="mailto:Email: contact@example.com">Email: contact@example.com</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-texts">
                    <strong>Opening Hours</strong>
                    <p className="contact-date">Monday - Friday : 9am - 5pm</p>
                    <p>Weekend Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
