import { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './Navbar.scss';
import logo from '../../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import NavbarSubmenu from './NavbarSubmenu';
import { useAuth } from '../../../contexts/AuthContext';
import img from '../../../assets/images/avatar.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const { currentUser, logout } = useAuth();


  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links__logo">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>        </div>
        <div className="navbar-links__container">
          <p>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </p>
          <p>
            <NavLink to="/courses" className={({ isActive }) => (isActive ? 'active' : '')}>
              Courses <NavbarSubmenu />
            </NavLink>
          </p>
          <p>
            <NavLink to="/community" className={({ isActive }) => (isActive ? 'active' : '')}>
              Community
            </NavLink>
          </p>
          <p>
            <NavLink to="/about-us" className={({ isActive }) => (isActive ? 'active' : '')}>
              About Us
            </NavLink>
          </p>
          <p>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
              Contact Us
            </NavLink>
          </p>
        </div>
      </div>
      <div className="navbar-sign">
        {currentUser ? (
          <div className="navbar-profile" onClick={() => navigate('/dashboard')}>
            <div className="navbar-profile__name">
              <span className='first-span'>{currentUser.firstName}</span><br />
              <span>{currentUser.role}</span>
            </div>
            <img src={'http://localhost:4000/' + currentUser?.avatar} alt="" className="navbar-profile__image" />
          </div>
        ) : (
          <>
            <button type="button" onClick={() => navigate('/sign-in')}>
              Sign in
            </button>
            <span className="slash">/</span>
            <button type="button" onClick={() => navigate('/sign-up')}>
              Sign up
            </button>
          </>
        )}

      </div>
      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#000"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#000"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="navbar-menu__container scale-up-center">
            <div className="navbar-menu__container-links">
              <p>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Home
                </NavLink>
              </p>
              <p>
                <NavLink to="/courses" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Courses
                </NavLink>
              </p>

              <p>

                <NavLink to="/community" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Community
                </NavLink>
              </p>
              <p>
                <NavLink to="/about-us" className={({ isActive }) => (isActive ? 'active' : '')}>
                  About Us
                </NavLink>
              </p>
              <p>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Contact Us
                </NavLink>
              </p>
              {currentUser &&
                <p>
                  <a onClick={logout} className={({ isActive }) => (isActive ? 'active' : '')}>
                    Log out
                  </a>
                </p>
              }
            </div>
            {currentUser ? (
              <div className="navbar-profile" onClick={() => navigate('/dashboard')}>
                <div className='navbar-menu__container-links-sign'>
                  <p>Dashboard</p>
                </div>

              </div>
            ) : (
              <>
                <div className="navbar-menu__container-links-sign">
                  <p onClick={() => navigate('/sign-in')}>Sign in</p>
                  <p onClick={() => navigate('/sign-up')}>Sign up</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
