import React, { useRef } from 'react';
import './styles.css';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
interface Props{
    taskName: string;
    setTaskName: React.Dispatch<React.SetStateAction<string>>;
    handleAdd:(e: React.FormEvent)=>void;
}

const InputField = ({taskName, setTaskName, handleAdd}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Box className= "input" 
    component="form"
    sx={{ '& .MuiInputLabel-root': { color: 'white', 
      m: 1,
      width: '25ch', 
      borderColor:'white',
       } }}
    onSubmit={(e) => {
      handleAdd(e);
      inputRef.current?.blur();
    }}>
      <div>
      <TextField id="standard-basic" label="Standard" variant="filled" />
      <TextField 
      id="standard-basic" label="Task Name" variant="filled" 
      ref = {inputRef}
      type = "input" 
      value={taskName} 
      onChange={(e)=>setTaskName(e.target.value)} 
      placeholder="Enter a Task Name" 
      />
      <Button className='input__submit' type = "submit" variant="contained">Submit</Button>
      {/* <button className='input__submit' type = "submit">
        Submit
      </button> */}
      </div>
    </Box>
  )
}

export default InputField
