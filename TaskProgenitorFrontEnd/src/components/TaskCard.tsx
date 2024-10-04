import React from 'react'
import { Task } from '../models/task'

type Props = {
    task:Task,
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskCard = (task, tasks, setTasks) => {
  return (
    <div>TaskCard</div>
  )
}

export default TaskCard