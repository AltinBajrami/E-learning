import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './NavbarSubmenu.scss';

const NavbarSubmenu = () => {
  const [toggleCoursesMenu, setToggleCoursesMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleCoursesMenu(prevState => !prevState);
  };

  return (
    <div className="navbar-links__courses">
      <p className="navbar-links__courses-title" onClick={handleToggleMenu}>
        <FaChevronDown className={toggleCoursesMenu ? 'rotate' : ''} />
      </p>
      {toggleCoursesMenu && (
        <div className="navbar-links__courses-menu">
          <p><a href="#course1">Course 1</a></p>
          <p><a href="#course2">Course 2</a></p>
          <p><a href="#course3">Course 3</a></p>
        </div>
      )}
    </div>
  );
};

export default NavbarSubmenu;