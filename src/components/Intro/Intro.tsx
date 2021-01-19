import React, { useContext } from 'react';
import { UserContext } from '../../Provider/User';
import { greetUser } from './helper';
import './Intro.css';

const Intro: React.FC = () => {
  const { displayName } = useContext(UserContext);
  const greet = greetUser();
  return (
    <div className='greet'>
      <h1>Hello {displayName && displayName}</h1>
      <h1>{greet && greet} !</h1>
      <div className='note'>
        <p>Your have some important</p>
        <p>tasks to do for today</p>
      </div>
      <h2 className='heading'>TASKS</h2>
    </div>
  );
};

export default Intro;
