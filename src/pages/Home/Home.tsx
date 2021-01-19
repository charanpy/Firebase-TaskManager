import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import Task from '../../components/AddTask/Task';
import TaskList from '../../components/TasksList/TaskList';
import Intro from '../../components/Intro/Intro';

const Home: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const modalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisible((prop) => !prop);
  };
  return (
    <main className='home'>
      <Intro />
      <TaskList />
      <Header />

      <Task visible={visible} modalHandler={modalHandler} />

      <button className='add' type='button' onClick={modalHandler}>
        <span>&#43;</span>
      </button>
    </main>
  );
};

export default Home;
