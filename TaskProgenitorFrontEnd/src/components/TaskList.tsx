import React from 'react'
import { Task } from '../models/task';
import "./styles.css"
import TaskCard from './TaskCard';
import Stack from '@mui/material/Stack';

interface Props{
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
const TaskList: React.FC<Props> = ({tasks, setTasks}) => {
  return (
    // <div className = "tasks">
    //     {tasks.map(task => (
    //         <TaskCard 
    //         task ={task}
    //         key = {task.id}
    //         tasks = {tasks}
    //         setTasks = {setTasks}
    //         />
    //     ))}    
    // </div>
    <Stack sx={{marginTop:2}}>
      {tasks.map(task => (
            <TaskCard 
            task ={task}
            key = {task.id}
            tasks = {tasks}
            setTasks = {setTasks}
            />
        ))}    
    </Stack>
  )
}

export default TaskList