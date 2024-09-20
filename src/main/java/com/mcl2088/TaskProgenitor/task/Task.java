package com.mcl2088.TaskProgenitor.task;

import java.time.LocalDate;


public class Task {
    private long id;
    private String taskName;
    private String assigner;


    private String description;
    private LocalDate deadline;
    private int timeLeft;
    private LocalDate dateCreated;

    public Task() {

    }

    public Task(String taskName, String assigner, String description, LocalDate deadline, int timeLeft, LocalDate dateCreated) {
        this.taskName = taskName;
        this.assigner = assigner;
        this.description = description;
        this.deadline = deadline;
        this.timeLeft = timeLeft;
        this.dateCreated = dateCreated;
    }

    public Task(long id, String taskName, String assigner, String description, LocalDate deadline, int timeLeft, LocalDate dateCreated) {
        this.id = id;
        this.taskName = taskName;
        this.assigner = assigner;
        this.description = description;
        this.deadline = deadline;
        this.timeLeft = timeLeft;
        this.dateCreated = dateCreated;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", taskName='" + taskName + '\'' +
                ", assigner='" + assigner + '\'' +
                ", description='" + description + '\'' +
                ", deadline=" + deadline +
                ", timeLeft=" + timeLeft +
                ", dateCreated=" + dateCreated +
                '}';
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getAssigner() {
        return assigner;
    }

    public void setAssigner(String assigner) {
        this.assigner = assigner;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public int getTimeLeft() {
        return timeLeft;
    }

    public void setTimeLeft(int timeLeft) {
        this.timeLeft = timeLeft;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }
}
