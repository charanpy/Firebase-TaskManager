import React from 'react';
import AppSvg from '../../assets/responsive.svg';
import UserSvg from '../../assets/user.svg';
import './Header.css';

const Header: React.FC = () => (
  <header className='header'>
    <div className='left_container'>
      <img src={AppSvg} alt="app" />
      <h2>Task Manager</h2>
    </div>
    <div className='right_container'>
      <img src={UserSvg} alt="app" className="user" />
    </div>
  </header>
);

export default Header;
