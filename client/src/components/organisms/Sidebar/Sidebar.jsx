import React from 'react';
import './Sidebar.scss';
import logo from '../../../assets/images/logo_black.png';
import notification from '../../../assets/images/notification.png';
import dashboard from '../../../assets/images/dashboard.png';
import chats from '../../../assets/images/chats.png';
import events from '../../../assets/images/events.png';

import questions from '../../../assets/images/questions.png';
import profile from '../../../assets/images/profile.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { RiCloseLine } from 'react-icons/ri';

const Sidebar = ({ notificationsNum, isSidebarOpen, setIsSidebarOpen, user }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the current path
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('authToken');

    navigate('/');
  };

  // Function to determine the class for navigation items
  const getNavItemClass = (path) => {
    return location.pathname === path ? 'nav-item active' : 'nav-item';
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <aside className={`${isSidebarOpen ? 'sidebar sidebarOpen' : 'sidebar'}`}>
      <div className="menu-toggle">
        <RiCloseLine className="close-btn" onClick={closeSidebar} />
      </div>
      <div className="logo">
        <img src={logo} alt="" />
        <Link to={'/'}>E-learning </Link>
      </div>
      <nav className="nav">
        <Link to="/dashboard" onClick={closeSidebar} className={getNavItemClass('/dashboard')}>
          <img className='icon' src={dashboard} alt="dashboard" />
          Dashboard
        </Link>

        <Link to="notifications" onClick={closeSidebar} className={getNavItemClass('/notifications')}>
          <img className='icon' src={notification} alt="notification" />
          Notifications<span className="badge">{notificationsNum}</span>
        </Link>
        <Link to="chat" onClick={closeSidebar} className={getNavItemClass('/chat')}>
          <img className='icon' src={chats} alt="chats" />
          Chat
        </Link>
        <Link to="events" onClick={closeSidebar} className={getNavItemClass('/events')}>
          <img className='icon' src={events} alt="events" />
          Events
        </Link>

        <Link to="classes" onClick={() => setIsSidebarOpen(false)} className={getNavItemClass('/classes')}>
          <img className='icon' src={events} alt="classes" />
          classes
        </Link>
        <Link to="my-profile" onClick={closeSidebar} className={getNavItemClass('/my-profile')}>
          <img className='icon' src={profile} alt="my-profile" />
          Profile
        </Link>
      </nav>
      <div className="profile">
        <img src={`http://localhost:4000/${user.avatar}`} alt="profile" className="profile-img" />
        <div className="profile-info">
          <h3>{user.firstName + ' ' + user.lastName}</h3>
          <p>{user.email}</p>
        </div>
        <button className="logout-item" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
