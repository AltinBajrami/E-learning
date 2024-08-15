import { useState } from 'react';
import './Header.scss';
import ToggleButton from '../../atoms/toggleButton/ToggleButton';
import { FaSearch } from 'react-icons/fa';
import moment from 'moment';

const Header = () => {
  const [isCardView, setIsCardView] = useState(true);

  const toggleView = () => {
    setIsCardView(prevState => !prevState);
  };

  // Get today's date and format it
  const today = moment().format('dddd, D MMMM YYYY');

  return (
    <>
      <header className="header">
        <div className="header__right">
          <div className="header__search-bar">
            <input type="text" placeholder='Search' />
            <div className="search-icon">
              <FaSearch />
            </div> 
          </div>
          
          <div className="header__date">
            <div className="header__today">
              <span>{today}</span>
            </div>
          </div>
        </div>
        <ToggleButton isCardView={isCardView} toggleView={toggleView} />
        <main>
          {isCardView ? (
            <div className="card-view">
              {/* Card view content */}
            </div>
          ) : (
            <div className="table-view">
              {/* Table view content */}
            </div>
          )}
        </main> 
      </header>
    </>
  );
};

export default Header;
