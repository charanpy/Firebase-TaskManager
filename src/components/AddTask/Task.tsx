import React, { useState } from 'react';
import './Task.css';
import TextInput from '../TextInput';

// interface TaskProps {
//   modalHandler: React.MouseEventHandler<HTMLDivElement> &
//   React.KeyboardEventHandler<HTMLDivElement>;
// }
interface TaskState{
  task:string
}
const Task: React.FC = () => {
  const [tasks, setTask] = useState<TaskState>({
    task:'',
  });
  
  const { task } = tasks;
  console.log(task);
  const handlechangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(e.target.value, 45)
    setTask({
      task : e.target.value,
    });
  };

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('hi');
    setTask({
      task: e.target.value,
    })
  }
  return (
    // <CSSTransition in={visible} timeout={500} classNames='fade'>
    <div
      className='modal'
    >
      <div className='modal_container'>
        {/* <TextInput 
          type='text'           
          placeholder='Task' 
          name='task' 
          value={task} 
          onChange={handlechangeHandler}
        /> */}
        <input type='text' name='task' value={task} onChange={handle.bind(this)} />
      </div>
    </div>
    // </CSSTransition>
  );
};

export default Task;
