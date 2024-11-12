import React, { useState } from 'react';
import './App.css'
import InputFields from './components/InputFields'
import { TaskPayload } from './models/taskPayload';
import TaskList from './components/TaskList';
import { Box, FormControlLabel, FormGroup, Switch, Typography } from '@mui/material';
import { TaskFormData } from './models/taskFormData';
import dayjs from 'dayjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTask, getTasks } from './api';

const App: React.FC = () => {
  const queryClient = useQueryClient();
  
  // Fetch tasks using useQuery
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });
  
  const [taskFormData, setTaskFormData] = useState<TaskFormData>({
    taskName: "",
    description: "",
    deadline: null
  });
  const [isAlertMode, setIsAlertMode] = useState(false);
  // Mutation to add a new task
  const mutation = useMutation({
    mutationFn: (newTask: TaskPayload) => addTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Invalidate tasks to refetch after adding
      setTaskFormData({
        taskName: "",
        description: "",
        deadline: null,
      });
    },
    onError: (error) => {
      console.error('Error adding task:', error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //console.log(name);
    setTaskFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleAlertToggle = () => {
    setIsAlertMode(prev => !prev);
  };
  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setTaskFormData((prevFormData) => ({
      ...prevFormData,
      deadline: newDate,
    }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskFormData.taskName) {
      const newTask: TaskPayload = {
        id: Date.now(), // Temporarily using Date.now() for id, replace it with server-generated id if available
        taskName: taskFormData.taskName,
        description: taskFormData.description,
        deadline: taskFormData.deadline ? taskFormData.deadline.toISOString() : null,
        dateCreated: dayjs().toISOString(),
        isCompleted: false,
      };
      console.log(dayjs().toISOString());
      mutation.mutate(newTask); // Use mutation to add the new task
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (isError) {
    return <div>Error fetching tasks!</div>; // Display error message
  }

  return (
    <>
        <Box>
          <Typography variant='h2'>Task Progenitor</Typography>
          <InputFields taskFormData={taskFormData} 
          handleAdd={handleAdd}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}/>
          <FormGroup>
            <FormControlLabel control={<Switch defaultChecked checked={isAlertMode} onChange={handleAlertToggle}/>} label = "Alert Mode" />
          </FormGroup>
          <TaskList tasks={tasks}
          isAlertMode={isAlertMode}
          />
          {/* {tasks.map((t) => (
            <li>{t.taskName}</li>
          ))} */}
        </Box>
    </>
  )
}

export default App