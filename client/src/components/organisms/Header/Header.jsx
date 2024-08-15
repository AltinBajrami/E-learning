import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import Navbar from '../Navbar/Navbar';
import kid from '../../../assets/images/kid.png';
import { FaSearch } from 'react-icons/fa';

import Iframe from '../../atoms/Iframe/Iframe';

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log('Search term:', searchTerm); // Log the search term

      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="homepage__header" id="home">
     
        <div className="homepage__header-top">
          <div className="homepage__header-content">
            <h1>Grow your skills to advance your career path.</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam vel nulla aliquam lacinia. Ultrices metus non  vehicula, fermentum metus facilisis.</p>
            <div className="homepage__header-content-input">
              <input
                type="text"
                placeholder='Search for lessons'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <div className="search-icon" onClick={handleSearch}>
                <FaSearch />
                <div className="inner-circle"></div>
              </div>
            </div>
          </div>
          <div className="homepage__header-image">
            <img src={kid} alt='' />
          </div>
        </div>
        <div className="bottom">
          <div className="homepage__header-horizontal">
            <div className="homepage__header-horizontal__box">
              <h1>2,4</h1>
              <p>Online Courses</p>
            </div>
            <div className="homepage__header-horizontal__box">
              <h1>500+</h1>
              <p>Experienced mentors</p>
            </div>
          </div>
          <div className="homepage__header-image__content">
            <h1>Online trainings from experts</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed <br /> diam vel nulla aliquam lacinia. Ultrices metus non vehicula.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
