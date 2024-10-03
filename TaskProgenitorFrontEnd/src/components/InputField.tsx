import React from 'react';
import './styles.css';

interface Props{
    taskName: string;
    setTaskName: React.Dispatch<React.SetStateAction<string>>;
    handleAdd:(e: React.FormEvent)=>void;
}

const InputField = ({taskName, setTaskName, handleAdd}: Props) => {
  return (
    <form className= "input" onSubmit={handleAdd}>
      <input type = "input" 
      value={taskName} 
      onChange={(e)=>setTaskName(e.target.value)} 
      placeholder="Enter a Task Name" 
      className="input__box"/>
      <button className='input__submit' type = "submit">
        Submit
      </button>
    </form>
  )
}

export default InputField
