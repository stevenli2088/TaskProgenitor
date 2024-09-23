package com.mcl2088.TaskProgenitor.task;

import jakarta.persistence.*;

import java.time.Duration;
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;

@Entity
@Table
public class Task {
    @Id
    @SequenceGenerator(
            name = "task_sequence",
            sequenceName = "task_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "task_sequence"
    )
    private long id;
    private String taskName;
    private String assigner;


    private String description;
    private LocalDate deadline;
    private LocalDate dateCreated;
    @Transient
    private String daysLeft;
    @Transient
    private boolean dueToday;
    @Transient
    private boolean overdue;

    public Task() {

    }

    public Task(String taskName, String assigner, String description, LocalDate deadline,  LocalDate dateCreated) {
        this.taskName = taskName;
        this.assigner = assigner;
        this.description = description;
        this.deadline = deadline;
        this.dateCreated = dateCreated;
    }

    public Task(long id, String taskName, String assigner, String description, LocalDate deadline, LocalDate dateCreated) {
        this.id = id;
        this.taskName = taskName;
        this.assigner = assigner;
        this.description = description;
        this.deadline = deadline;
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
                ", dateCreated=" + dateCreated +
                ", timeLeft=" + daysLeft +
                ", dueToday=" + dueToday +
                ", overdue=" + overdue +
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

    public String getDaysLeft() {
        LocalDate now = LocalDate.now();
        long days = ChronoUnit.DAYS.between(now, deadline);

        return String.format("%d days", days);
    }

    public void setDaysLeft(String daysLeft) {
        this.daysLeft = daysLeft;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }

    public boolean isDueToday() {
        LocalDate now = LocalDate.now();
        return now.equals(deadline);
    }

    public void setDueToday(boolean dueToday) {
        this.dueToday = dueToday;
    }


    public boolean isOverdue() {
        LocalDate now = LocalDate.now();
        return now.isAfter(deadline);
    }

    public void setOverdue(boolean overdue) {
        this.overdue = overdue;
    }
}
