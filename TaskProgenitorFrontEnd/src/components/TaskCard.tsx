import React from 'react';
import { Task } from '../models/task';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import "./styles.css";
type Props = {
    task: Task,
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskCard: React.FC<Props> = ({task, tasks, setTasks}) => {
  return (
    <form className="task__card">
      <span className="task__card--text">{task.taskName}</span>
      <div>
        <span className="icon">
          <AiFillEdit />
        </span>
        <span className="icon">
          <AiFillDelete />
        </span>
        
        <span className="icon">
          <MdDone />
        </span>
      </div>

    </form>
  )
}

export default TaskCard