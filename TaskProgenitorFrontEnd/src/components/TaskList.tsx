import React, { useState } from 'react'
import { Task } from '../models/task';
import "./styles.css"
import TaskCard from './TaskCard';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import TaskEditModal from './TaskEditModal';
import dayjs from 'dayjs';

interface Props{
    tasks: Task[];
    isAlertMode: boolean;
}
const TaskList: React.FC<Props> = ({tasks, isAlertMode}) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null); // State to hold the task being edited
  const [open, setOpen] = useState(false); // Modal open state

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTask(null);
  };


  const sortedTasks = [...tasks].sort((a, b) => {
    console.log(typeof a.deadline); // "string", "number", etc.
    console.log(a.deadline); // "2022-01-01T00:00:00.000Z", etc.
    const dateA = dayjs(a.deadline);
    const dateB = dayjs(b.deadline);
    if (dateA === null) return 1;  
    if (dateB === null) return -1; 
    return dateA.isBefore(dateB) ? -1 : 1;
  });
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
    <Box>
      <Stack sx={{marginTop:2}}>
      {sortedTasks.map(task => (
            <TaskCard 
            task ={task}
            key = {task.id}
            isAlertMode = {isAlertMode}
            onEdit={handleEdit}
            />
        ))}    
    </Stack>
    <TaskEditModal 
    open={open}
    onClose={handleClose}
    task={editingTask}
  />
    </Box>
    
  )
}

export default TaskList