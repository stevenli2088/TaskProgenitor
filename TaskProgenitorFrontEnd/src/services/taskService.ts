import axios from 'axios';
import { Task } from '../models/task.ts';

const API_URL = 'http://localhost:8080/api/v1/tasks';


const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(API_URL);
    return response.data;
};

const addTask = async (task: Task): Promise<void> => {
    await axios.post(API_URL, task);
};

const deleteTask = async (taskId: number): Promise<void> => {
    await axios.delete(`${API_URL}/${taskId}`);
};

const updateTask = async (
    taskId: number,
    updatedFields: Partial<Task>
): Promise<void> => {
    await axios.put(`${API_URL}/${taskId}`, updatedFields);
};



const TaskService = {
    getTasks,
    addTask,
    deleteTask,
    updateTask,
  };

  
export default TaskService;