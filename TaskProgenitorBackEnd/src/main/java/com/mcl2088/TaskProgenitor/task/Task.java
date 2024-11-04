package com.mcl2088.TaskProgenitor.task;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.*;
import java.time.format.DateTimeParseException;
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
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    private ZonedDateTime deadline;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    private ZonedDateTime dateCreated;
    @Transient
    private boolean dueToday;
    @Transient
    private boolean completed;
    @Transient
    private boolean overdue;

    public Task() {

    }

    public Task(String taskName, String assigner, String description, String ISOdeadline,  String ISOdateCreated) {
        this.deadline = null;
        if (ISOdeadline != null && !ISOdeadline.isEmpty()) {
            try {
                this.deadline = ZonedDateTime.parse(ISOdeadline);
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid ISO deadline format: " + ISOdeadline, e);
            }
        }
        this.dateCreated = null;
        if (ISOdeadline != null && !ISOdeadline.isEmpty()) {
            try {
                this.deadline = ZonedDateTime.parse(ISOdateCreated);
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid ISO deadline format: " + ISOdeadline, e);
            }
        }
        this.taskName = taskName;
        this.assigner = assigner;
        this.description = description;
    }

    public Task(long id, String taskName, String assigner, String description, String ISOdeadline,  String ISOdateCreated) {
        this.deadline = null;
        if (ISOdeadline != null && !ISOdeadline.isEmpty()) {
            try {
                this.deadline = ZonedDateTime.parse(ISOdeadline);
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid ISO deadline format: " + ISOdeadline, e);
            }
        }
        this.dateCreated = null;
        if (ISOdeadline != null && !ISOdeadline.isEmpty()) {
            try {
                this.deadline = ZonedDateTime.parse(ISOdateCreated);
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid ISO deadline format: " + ISOdeadline, e);
            }
        }
        this.id = id;
        this.taskName = taskName;
        this.assigner = assigner;
        this.description = description;
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
                ", dueToday=" + dueToday +
                ", overdue=" + overdue +
                ", completed=" + completed +
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

    public ZonedDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(ZonedDateTime deadline) {
        this.deadline = deadline;
    }



    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }


    public ZonedDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(ZonedDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public boolean isDueToday() {
        ZonedDateTime now = ZonedDateTime.now();
        return now.equals(deadline);
    }

    public void setDueToday(boolean dueToday) {
        this.dueToday = dueToday;
    }


    public boolean isOverdue() {
        ZonedDateTime now = ZonedDateTime.now();
        return now.isAfter(deadline);
    }

    public void setOverdue(boolean overdue) {
        this.overdue = overdue;
    }
}
