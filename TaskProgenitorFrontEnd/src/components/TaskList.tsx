import React, { useState } from 'react'
import { Task } from '../models/task';
import "./styles.css"
import TaskCard from './TaskCard';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import TaskEditModal from './TaskEditModal';

interface Props{
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    isAlertMode: boolean;
}
const TaskList: React.FC<Props> = ({tasks, setTasks, isAlertMode}) => {
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

  const handleSave = (updatedTask: Task) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    handleClose(); // Close the modal after saving
  };
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.dueDate === null) return 1;  
    if (b.dueDate === null) return -1; 
    return a.dueDate.isBefore(b.dueDate) ? -1 : 1;
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
            tasks = {tasks}
            setTasks = {setTasks}
            isAlertMode = {isAlertMode}
            onEdit={handleEdit}
            />
        ))}    
    </Stack>
    <TaskEditModal 
    open={open}
    onClose={handleClose}
    task={editingTask}
    onSave={handleSave}
  />
    </Box>
    
  )
}

export default TaskList