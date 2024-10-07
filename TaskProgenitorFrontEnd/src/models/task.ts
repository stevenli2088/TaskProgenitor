import dayjs from "dayjs";

export interface Task{
    id: number;
    taskName: string;
    description: string;
    dueDate: dayjs.Dayjs | null;
    isComplete: boolean;
}