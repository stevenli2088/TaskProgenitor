import React from 'react';
import { Task } from '../models/task';
import { TaskPayload } from '../models/taskPayload';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import "./styles.css";
import dayjs from 'dayjs';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateTask, deleteTask } from '../api';

type Props = {
  task: Task,
  isAlertMode: boolean;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<Props> = ({ task, isAlertMode, onEdit }) => {
  const queryClient = useQueryClient();

  // Mutation to update task completion status
  const toggleCompleteMutation = useMutation({
    mutationFn: (updatedTask: Partial<TaskPayload>) => updateTask(updatedTask.id!, updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Refetch tasks after updating
    },
    onError: (error) => {
      console.error('Error updating task card:', error);
    },
  });

  // Mutation to delete task
  const deleteMutation = useMutation({
    mutationFn: (taskId: number) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Refetch tasks after deleting
    },
    onError: (error) => {
      console.error('Error deleting task card:', error);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(task.id);
  };

  const onDone = () => {
    const updatedTask: Partial<TaskPayload> = { id: task.id, isCompleted: !task.isCompleted };
    toggleCompleteMutation.mutate(updatedTask);
  };

  const isOverdue = task.deadline && dayjs().isAfter(task.deadline);
  const isDueSoon = task.deadline && dayjs().add(1, 'day').isAfter(task.deadline) && !isOverdue;

  const alert = isOverdue
    ? { text: "Overdue", color: 'rgba(255, 0, 0, 0.3)' }
    : isDueSoon
      ? { text: "Due Soon", color: 'rgba(255, 255, 0, 0.3)' }
      : { text: "Due", color: 'rgba(0, 255, 0, 0.3)' };

  return (
    <Box sx={{ backgroundColor: "#FFE4B5", borderRadius: 10, padding: 2, margin: 2 }}>
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
          {task.deadline ? (
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
                {alert.text}: {task.deadline?.format("MM/DD/YYYY")} at {task.deadline.format('LTS')}
              </Typography>
            ) : (
              // Render due date normally
              <Typography variant="h6" component="div">
                Due: {task.deadline?.format("MM/DD/YYYY")} at {task.deadline.format('LTS')}
              </Typography>
            )
          ) : (
            // Render "No Due Date" if deadline is null
            <Typography variant="h6" component="div" sx={{ color: 'gray' }}>
              No Deadline
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
          <FormControlLabel control={<Switch checked={task.isCompleted} onChange={onDone} />} label="Done" />
        </FormGroup>
        <Button size="small" onClick={() => onEdit(task)}>Edit</Button>
        <Button size="small" onClick={handleDelete}>Delete</Button>
      </CardActions>
    </Box>
  )
}

export default TaskCard;