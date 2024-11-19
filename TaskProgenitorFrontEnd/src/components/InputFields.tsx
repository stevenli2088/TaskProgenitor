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
        maxWidth: '1000px',
        backgroundColor: '#f5f5f5', // Light gray background color
        padding: '24px', // Add more padding
        borderRadius: '8px', // Rounded corners
        border: '1px solid #d3d3d3',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        '& .MuiInputLabel-root': {
          color: 'black',
          m: 1,
        },
        '& .MuiTextField-root, & .MuiDatePicker-root': {
          marginBottom: '16px', // Add 16px spacing between each element
          width: '100%', // Full width of the parent container
          
        },
        '& .MuiInputBase-root': {
          color: 'black', // Change text color to black
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#d3d3d3', // Light gray border color when focused
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
        slotProps={{
          inputLabel: {
            sx: {
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            },
          },
        }}
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
          marginBottom: '16px', // Add 16px spacing between each element
          width: '70%', // Full width of the parent container
          backgroundColor: '#f7f7f7', // Slightly off-white color for the button
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