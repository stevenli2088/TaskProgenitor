
import React, { useState } from 'react';
import './App.css'
import InputField from './components/InputField'
import { Task } from './models/task';
import TaskList from './components/TaskList';
import { Box, Typography } from '@mui/material';

const App: React.FC = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if(taskName){
      setTasks([...tasks,{id:Date.now(), 
        taskName:taskName, 
        isComplete: false}]);
      setTaskName("");
    }
  };

  console.log(tasks);

  return (
    <>
        <Box>
          <Typography variant='h2'>Task Progenitor</Typography>
          <InputField taskName={taskName} 
          setTaskName={setTaskName} 
          handleAdd={handleAdd}/>
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