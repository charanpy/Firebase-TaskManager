import React, { useContext, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './TaskList.css';
import { getUpdatedTasks } from '../../firebase/firebase';
import { UserContext } from '../../Provider/User';
import Task from './Task';

interface TodoSchema {
  todoId: string;
  id: string;
  userId: string;
  task: string;
  created?: {
    seconds: number;
    nanoseconds: number;
  };
}

const TaskList = () => {
  const { id } = useContext(UserContext);
  const [tasks, setTasks] = React.useState<TodoSchema[]>([]);

  useEffect(() => {
    // getAllTasks();
    async function getAllTasksFromDb() {
      const taskRef = await getUpdatedTasks(id);
      taskRef.orderBy('created', 'desc').onSnapshot((snapshots) => {
        const data = snapshots.docs.map((doc) =>({
          todoId: doc.id,
          ...doc.data(),
        })) as TodoSchema[];
        
        setTasks(data);
      });
    }
    getAllTasksFromDb();
    return () => {
      getAllTasksFromDb();
      setTasks([]);
    }
  }, [id]);

  return (
    <TransitionGroup className='taskList'>
      {tasks.map((task) => (
        <CSSTransition key={task.id} timeout={500} classNames='fade'>
          <Task
            key={task.id}
            id={task.id}
            task={task.task}
            created={task.created?.seconds}
            todoId={task.todoId}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default TaskList;
