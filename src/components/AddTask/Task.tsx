import React, { useState, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Task.css';
import TextInput from '../TextInput';
import Button from '../Button/Button';
import { addATask } from '../../firebase/firebase';
import { UserContext } from '../../Provider/User';

interface TaskProps {
  visible: boolean;
  modalHandler: React.MouseEventHandler<HTMLButtonElement>
}
interface TaskState {
  task: string;
}
const Task: React.FC<TaskProps> = ({ visible, modalHandler }) => {
  const { id } = useContext(UserContext);
  const [tasks, setTask] = useState<TaskState>({
    task: '',
  });

  const { task } = tasks;
  const handlechangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      task: e.target.value,
    });
  };

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await addATask(task, id);
    
    setTask({
      task: '',
    })
    modalHandler(e);
    
  }

  return (
    // <CSSTransition in={visible} timeout={500} classNames='fade'>
    <CSSTransition in={visible} timeout={500} classNames='fade' unmountOnExit>
      <div className='modal'>
        <div className='modal_container'>
          <TextInput
            type='text'
            placeholder='Task'
            name='task'
            value={task}
            onChange={handlechangeHandler}
            popup={+true}
          />
          <Button inverted style={{ margin: 0 }} onClickHandler={submitHandler}>
            Add Todo
          </Button>
          <button type='button' className='close' onClick={modalHandler}>
            <span>&#10006;</span>
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Task;
