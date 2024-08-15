import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.scss';
import scroll from '../../../assets/images/scroll.png'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 1100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);


  return (
    <img
      src={scroll}
      alt="Scroll to top"
      id="scrollToTopButton"
      onClick={scrollToTop}
      style={{ display: isVisible ? 'block' : 'none' }}
    />
  );
};

export default ScrollToTopButton;