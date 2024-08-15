import React from 'react';
import './Footer.scss';
import logo from '../../../assets/images/logo_white.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt='logo'/>
          <h1>e-Learning</h1>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h3>Product</h3>
            <a href="#core">Core</a>
            <a href="#enterprise">Enterprise</a>
            <a href="#pricing-plan">Pricing plan</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
          </div>
          <div className="footer-column">
            <h3>Company</h3>
            <a href="#about-us">About us</a>
            <a href="#careers">Careers <span className="badge">14</span></a>
            <a href="#legal">Legal</a>
            <a href="#gallery">Gallery</a>
          </div>
          <div className="footer-column">
            <h3>Legals</h3>
            <a href="#privacy">Privacy</a>
            <a href="#licenses">Licenses</a>
            <a href="#terms">Terms</a>
            <a href="#refunds">Refunds</a>
            <a href="#cookies">Cookies</a>
          </div>
          <div className="footer-column">
            <h3>Social media</h3>
            <a href="#instagram">Instagram</a>
            <a href="#linkedin">LinkedIn</a>
            <a href="#facebook">Facebook</a>
            <a href="#twitter">Twitter(X)</a>
          </div>
        </div>
      </div>
      <div className="footer-newsletter">
        <div className="newsletter-text">
          <h3>Join our newsletter</h3>
          <p>We'll send you a nice letter once per week. No spam.</p>
        </div>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button className='button' type="submit">Subscribe</button>
        </form>
      </div>
      <div className="footer-bottom">
        <p>©Copyright 2024 StarLabs. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;