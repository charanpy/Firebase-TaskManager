import React, {  useState } from 'react';
import AppSvg from '../../assets/responsive.svg';
import UserSvg from '../../assets/user.svg';
import Signout from '../signout/Signout';
import './Header.css';

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const modalVisible = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisible(props => !props);
  }
  const closeModal = () => { setVisible(props => !props);}
  return (
    <header className='header'>
      <div className='left_container'>
        <img src={AppSvg} alt='app' />
        <h2>Task Manager</h2>
      </div>
      <button type='button' className='right_container' onClick={modalVisible}>
        <img src={UserSvg} alt='app' className='user' />
      </button>
      <Signout visible={visible} closeModal={closeModal} />
    </header>
  );
};

export default Header;
