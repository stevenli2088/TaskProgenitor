export interface TaskPayload {
    id: number;
    taskName: string;
    description: string;
    deadline: string | null;
    dateCreated: string | null;
    isComplete: boolean;
}