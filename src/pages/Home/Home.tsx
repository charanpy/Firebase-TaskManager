import React, { useContext, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Home.css';
import { auth } from '../../firebase/firebase';
import { UserContext } from '../../Provider/User';
import Header from '../../components/Header/Header';
import Task from '../../components/AddTask/Task';

const Home: React.FC = () => {
  const { setUserNull } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const signOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await auth.signOut();
    setUserNull();
  };
  const modalHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setVisible((prop) => !prop);
  };
  return (
    <main>
      <Header />
      
      <Task visible={visible} modalHandler={modalHandler} />
      
      <h1>Home</h1>
      <button type='submit' onClick={signOut} style={{marginTop:'20%'}}>
        Signout
      </button>
      <button
        className='add'
        type='button'
        onClick={modalHandler}
      >
        <span>&#43;</span>
      </button>
    </main>
  );
};

export default Home;
