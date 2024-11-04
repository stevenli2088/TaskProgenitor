import dayjs from "dayjs";

export interface Task{
    id: number;
    taskName: string;
    description: string;
    deadline: dayjs.Dayjs | null;
    dateCreated: dayjs.Dayjs | null;
    isComplete: boolean;
}