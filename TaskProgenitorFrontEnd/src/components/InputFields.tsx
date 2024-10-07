import React, { useRef } from 'react';
import './styles.css';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { TaskFormData } from '../models/taskFormData';
import dayjs from 'dayjs';
interface Props{
    taskFormData: TaskFormData;
    setTaskFormData: React.Dispatch<React.SetStateAction<TaskFormData>>;
    handleAdd:(e: React.FormEvent)=>void;
    handleInputChange:(e: React.ChangeEvent<HTMLInputElement>)=>void;
    handleDateChange:(e: dayjs.Dayjs | null )=>void;
}

const InputFields = ({taskFormData, setTaskFormData, handleAdd, handleInputChange, handleDateChange}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Box className= "input" 
    component="form"
    noValidate
    sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& .MuiInputLabel-root': { 
        color: 'black',
      m: 1,
      width: '500ch', 
       },
       '& .MuiTextField-root, & .MuiButton-root, & .MuiDatePicker-root': {
          marginBottom: '16px', // Add 16px spacing between each element
          width: '50ch', // Adjust width as needed
        },
       }}
       
    onSubmit={(e) => {
      handleAdd(e);
      inputRef.current?.blur();
    }}>
      
      <TextField 
      id="standard-basic" label="Task Name" variant="standard" 
      name = "taskName"
      ref = {inputRef}
      value={taskFormData.taskName} 
      onChange={handleInputChange} 
      />
      <TextField 
      id="standard-basic" 
      label="Description" 
      variant="standard" 
      name = "description"
      value={taskFormData.description} 
      onChange={handleInputChange}
      />
      <DateTimePicker
          label="Due Date"
          value={taskFormData.dueDate}
          name = "dueDate"
          onChange={handleDateChange}
        />
      <Button className='input__submit' type = "submit" variant="contained">Submit</Button>
      {/* <button className='input__submit' type = "submit">
        Submit
      </button> */}
    </Box>
  )
}

export default InputFields