import React, { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Signout.css';
import { auth } from '../../firebase/firebase';
import { UserContext } from '../../Provider/User';

const Signout: React.FC<{ visible: boolean; closeModal: Function }> = ({
  visible,
  closeModal,
}) => {
  const { setUserNull } = useContext(UserContext);
  const signout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await auth.signOut();
    closeModal();
    setUserNull();
    
  };
  return (
    <CSSTransition in={visible} timeout={500} classNames='slide' unmountOnExit>
      <div className='signout_Modal'>
        <button type='submit' onClick={signout}>
          Signout
        </button>
      </div>
    </CSSTransition>
  );
};

export default Signout;
