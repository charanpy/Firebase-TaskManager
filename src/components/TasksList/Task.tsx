import React from 'react';
import { deleteTask } from '../../firebase/firebase';

interface TaskProps {
  id: string;
  task: string;
  created?: number;
  todoId:string;
}
const Task: React.FC<TaskProps> = (props) => {
  const time = new Date(props.created! * 1000).toLocaleString().split(',')[1];
  
  const deleteATask = async (id:string) => {
    await deleteTask(id);
  }
  return (
    <div className='task'>
      <div className='task_details'>
        <p>{time}</p>
        <h1>{props.task[0].toUpperCase()+props.task.slice(1)}</h1>
      </div>
      <div className='del'>
        <button type='button' onClick={()=> deleteATask(props.todoId)}>&#128465;</button>
      </div>
    </div>
  );
};

export default Task;
