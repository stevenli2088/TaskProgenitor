import React from 'react';
import { Task } from '../models/task';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import "./styles.css";
import dayjs from 'dayjs';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';


type Props = {
    task: Task,
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    isAlertMode: boolean;
    onEdit: (task: Task) => void;
}

const TaskCard: React.FC<Props> = ({task, tasks, setTasks, isAlertMode, onEdit}) => {
  const handleDelete = (id: number) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
};
const onDone = () => {    
  const updatedTask = { ...task, isComplete: !task.isComplete };
  
  const updatedTasks = tasks.map(t => t.id === task.id ? updatedTask : t);
  setTasks(updatedTasks);
};
const isOverdue = task.dueDate && dayjs().isAfter(task.dueDate); 
const isDueSoon = task.dueDate && dayjs().add(1, 'day').isAfter(task.dueDate) && !isOverdue;  

  const alert = isOverdue
    ? {text: "Overdue", color:'rgba(255, 0, 0, 0.3)'}
    : isDueSoon
    ? {text: "Due Soon", color: 'rgba(255, 255, 0, 0.3)'}
    : {text: "Due", color: 'rgba(0, 255, 0, 0.3)'}; 
  return (
    <Box sx={{backgroundColor:"#FFE4B5", borderRadius:10, padding: 2, margin:2}}>
    <CardContent 
    sx={{
      color: 'black',
      '& .MuiTypography-root': {
        color: 'inherit', 
      },
    }}
    >
      <Typography variant="h5" component="div">
        {task.taskName}
      </Typography>
      <Typography variant="h6" component="div">
        {task.description}
      </Typography>
      <Typography variant="h6" component="div">
      {task.dueDate ? (
          isAlertMode ? (
            // Render highlighted due date
            <Typography
              variant="h6"
              component="div"
              sx={{
                backgroundColor: alert.color, // Highlight background color
                display: 'inline-block',
                padding: '0.2em 0.5em', // Padding around the highlighted text
                borderRadius: '4px',    // Rounded corners for the highlight
              }}
            >
              {alert.text}: {task.dueDate?.format("MM/DD/YYYY")} at {task.dueDate.format('LTS')}
            </Typography>
          ) : (
            // Render due date normally
            <Typography variant="h6" component="div">
              Due: {task.dueDate?.format("MM/DD/YYYY")} at {task.dueDate.format('LTS')}
            </Typography>
          )
        ) : (
          // Render "No Due Date" if dueDate is null
          <Typography variant="h6" component="div" sx={{ color: 'gray' }}>
            No Due Date
          </Typography>
        )}
      </Typography>
    </CardContent>
    <CardActions
    
    sx={{
      color: 'black',
      '& .MuiButton-root': {
        color: 'inherit', 
      },
    }}>
    <FormGroup>
      <FormControlLabel control={<Switch checked={task.isComplete} onChange={onDone}/>} label = "Done" />
    </FormGroup>
    <Button size="small" onClick={() => onEdit(task)}>Edit</Button>
    <Button size="small" onClick={() => handleDelete(task.id)}>Delete</Button>
    </CardActions>
  </Box>
    
  )
}


export default TaskCard