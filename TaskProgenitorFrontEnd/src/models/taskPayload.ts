export interface TaskPayload {
    id: number;
    taskName: string;
    description: string;
    deadline: string | null;
    dateCreated: string | null;
    isCompleted: boolean; // Ensure isComplete is part of the TaskPayload interface
}