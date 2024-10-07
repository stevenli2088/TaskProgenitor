import dayjs from "dayjs";



export interface TaskFormData {
    taskName: string;
    description: string;
    dueDate: dayjs.Dayjs | null;
  }