import React from 'react';
import { Task } from '../models/task';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import "./styles.css";


type Props = {
    task: Task,
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskCard: React.FC<Props> = ({task, tasks, setTasks}) => {
  const handleDelete = (id: number) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
};
  return (
    <Box sx={{backgroundColor: 'black', borderRadius:10, padding: 2, margin:2}}>
    <CardContent >
      <Typography variant="h5" component="div">
        {task.taskName}
      </Typography>
      <Typography variant="h7" component="div">
        Description of Task
      </Typography>
    </CardContent>
    <CardActions>
    <Button size="small">Mark as Done</Button>
    <Button size="small">Edit</Button>
    <Button size="small" onClick={() => handleDelete(task.id)}>Delete</Button>
    </CardActions>
  </Box>
    
  )
}


export default TaskCard

{/* <form className="task__card">
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

    </form> */}