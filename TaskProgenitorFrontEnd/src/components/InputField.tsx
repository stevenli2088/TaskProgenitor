import React, { useRef } from 'react';
import './styles.css';

interface Props{
    taskName: string;
    setTaskName: React.Dispatch<React.SetStateAction<string>>;
    handleAdd:(e: React.FormEvent)=>void;
}

const InputField = ({taskName, setTaskName, handleAdd}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form className= "input" 
    onSubmit={(e) => {
      handleAdd(e);
      inputRef.current?.blur();
    }}>
      <input 
      ref = {inputRef}
      type = "input" 
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
