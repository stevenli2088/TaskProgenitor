import React, { useState, useEffect } from 'react';
import { Task } from '../models/task';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { TaskFormData } from '../models/taskFormData';
import { DateTimePicker } from '@mui/x-date-pickers';

type Props = {
  open: boolean;
  onClose: () => void;
  task: Task | null; // Could be null when not editing
  onSave: (task: Task) => void;
};

const TaskEditModal: React.FC<Props> = ({ open, onClose, task, onSave }) => {
    const [taskEdits, setTaskEdits] = useState<TaskFormData>({
        taskName: "",
        description: "",
        dueDate: null
      });

  useEffect(() => {
    if (task) {
        setTaskEdits((prevFormData)=>({
            ...prevFormData,
            taskName: task.taskName,
            description: task.description,
            dueDate: task.dueDate,

        })); // Set due date for editing
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
        const updatedTask: Task = {
            ...task, 
            taskName: taskEdits.taskName, 
            description: taskEdits.description, 
            dueDate: taskEdits.dueDate, 
          };
      
      onSave(updatedTask);
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskEdits((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleEditDateChange = (newDate: dayjs.Dayjs | null) => {
    setTaskEdits((prevFormData) => ({
      ...prevFormData,
      dueDate: newDate,
    }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: 450,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 'auto', 
      '& .MuiTextField-root': {
        mb: 2, 
      },
    }}>
        <Box
      component="form" onSubmit={handleSubmit}>
          <TextField
            label="Task Name"
            name='taskName'
            value={taskEdits.taskName}
            onChange={handleEditInputChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={taskEdits.description}
            name='description'
            onChange={handleEditInputChange}
            fullWidth
            required
          />
          <DateTimePicker
          label="Due Date"
          value={taskEdits.dueDate}
          name = "dueDate"
          onChange={handleEditDateChange}
        />
           <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
        </Box>
        
      </Box>
    </Modal>
  );
};


export default TaskEditModal
