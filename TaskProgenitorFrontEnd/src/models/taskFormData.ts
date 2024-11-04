import dayjs from "dayjs";



export interface TaskFormData {
    taskName: string;
    description: string;
    deadline: dayjs.Dayjs | null;
  }