import React, { useRef } from 'react';
import './styles.css';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { TaskFormData } from '../models/taskFormData';
import dayjs from 'dayjs';
interface Props{
    taskFormData: TaskFormData;
    handleAdd:(e: React.FormEvent)=>void;
    handleInputChange:(e: React.ChangeEvent<HTMLInputElement>)=>void;
    handleDateChange:(e: dayjs.Dayjs | null )=>void;
}
const InputFields = ({ taskFormData, handleAdd, handleInputChange, handleDateChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Box
      className="input"
      component="form"
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        maxWidth: '450px',
        '& .MuiInputLabel-root': {
          color: 'black',
          m: 1,
        },
        '& .MuiTextField-root, & .MuiButton-root, & .MuiDatePicker-root': {
          marginBottom: '16px', // Add 16px spacing between each element
          width: '100%', // Full width of the parent container
        },
      }}
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <TextField
        fullWidth
        id="task-name"
        label="Task Name"
        variant="standard"
        name="taskName"
        ref={inputRef}
        value={taskFormData.taskName}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        id="description"
        label="Description"
        name="description"
        value={taskFormData.description}
        multiline
        rows={6} // Initial number of rows
        sx={{
          '& .MuiInputBase-root': {
            overflow: 'auto', // Enable scroll bar
            wordWrap: 'break-word', // Enable text wrapping
          },
        }}
        onChange={handleInputChange}
      />
      <DateTimePicker
        label="Due Date"
        value={taskFormData.deadline}
        name="dueDate"
        onChange={handleDateChange}
        sx={{ width: '100%' }} // Ensure full width for DateTimePicker
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          width: '70%', // Ensure full width for Button
          backgroundColor: '#f0f0f0', // Slightly off-white color
          color: 'black', // Black text
          '&:hover': {
            backgroundColor: '#e0e0e0', // Slightly darker off-white color on hover
          },
          '&:active': {
            backgroundColor: '#d0d0d0', // Even darker off-white color on active
          },
        }}
      >
        Create Task
      </Button>
    </Box>
  );
};

export default InputFields