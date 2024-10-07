
import React, { useState } from 'react';
import './App.css'
import InputFields from './components/InputFields'
import { Task } from './models/task';
import TaskList from './components/TaskList';
import { Box, Typography } from '@mui/material';
import { TaskFormData } from './models/taskFormData';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const [taskFormData, setTaskFormData] = useState<TaskFormData>({
    taskName: "",
    description: "",
    dueDate: null
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name);
    setTaskFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setTaskFormData((prevFormData) => ({
      ...prevFormData,
      dueDate: newDate,
    }));
  };
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if(taskFormData.taskName){
      setTasks([...tasks,{id:Date.now(), 
        taskName:taskFormData.taskName, 
        description: taskFormData.description,
        dueDate: taskFormData.dueDate,
        isComplete: false}]);
      setTaskFormData(
        {
          taskName: "",
          description: "",
          dueDate: null
        }
      );
    }
    console.log(taskFormData.taskName);
  };


  return (
    <>
        <Box>
          <Typography variant='h2'>Task Progenitor</Typography>
          <InputFields taskFormData={taskFormData} 
          setTaskFormData={setTaskFormData} 
          handleAdd={handleAdd}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}/>
          <TaskList tasks={tasks}
          setTasks={setTasks}
          />
          {/* {tasks.map((t) => (
            <li>{t.taskName}</li>
          ))} */}
        </Box>
        
    </>
  )
}

export default App



// const [count, setCount] = useState(0)
{/* <div>
<a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}