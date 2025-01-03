import axios from 'axios';
import { Task } from '../models/task';
import { TaskPayload } from '../models/taskPayload';
import dayjs from 'dayjs';

const API_URL = import.meta.env.VITE_TASK_API_BASE_URL;

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(API_URL);
    const tasks = response.data;
    console.log('tasks:', tasks);
    return tasks.map((task: Task) => ({
      ...task,
      deadline: task.deadline ? dayjs(task.deadline) : null,
      dateCreated: task.dateCreated ? dayjs(task.dateCreated) : null,
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (task: TaskPayload): Promise<void> => {
  console.log('task:', task);
  await axios.post(API_URL, task);
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await axios.delete(`${API_URL}/${taskId}`);
};

export const updateTask = async (
  taskId: number,
  updatedTask: Partial<TaskPayload>
): Promise<void> => {
  const params = new URLSearchParams();
  if (updatedTask.deadline !== undefined && updatedTask.deadline !== null) params.append('ISOdeadline', updatedTask.deadline);
  if (updatedTask.taskName !== undefined) params.append('taskName', updatedTask.taskName);
  if (updatedTask.description !== undefined) params.append('description', updatedTask.description);
  if (updatedTask.isCompleted !== undefined) params.append('isCompleted', String(updatedTask.isCompleted));

  await axios.put(`${API_URL}/${taskId}?${params.toString()}`);
};