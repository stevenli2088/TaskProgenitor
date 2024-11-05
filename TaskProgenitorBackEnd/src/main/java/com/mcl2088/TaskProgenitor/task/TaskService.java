package com.mcl2088.TaskProgenitor.task;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Objects;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    @Autowired
    public TaskService(TaskRepository taskRepository){
        this.taskRepository=taskRepository;
    }
    public List<Task> getTasks(){
        return taskRepository.findAll();
    }
    public void addTask(Task task){
        Long taskId = task.getId();

        //Check if taskId is already taken
        boolean exists = taskRepository.existsById(taskId);
        if(exists){
            throw new IllegalStateException("Task with id " + taskId + " already exists.");
        }
        if(task.getDateCreated() == null){
            task.setDateCreated(ZonedDateTime.now());
        }

        taskRepository.save(task);
    }

    public void deleteTask(Long taskId){
        boolean exists = taskRepository.existsById(taskId);
        if(!exists){
            throw new IllegalStateException("Task with id " + taskId + " does not exist.");
        }
        taskRepository.deleteById(taskId);
    }
    @Transactional
    public void updateTask(Long taskId, String ISOdeadline, String taskName, String description, Boolean isCompleted){
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new IllegalStateException("Task with id " + taskId + " does not exist."));
        ZonedDateTime deadline = null;
        if (ISOdeadline != null && !ISOdeadline.isEmpty()) {
            try {
                System.out.println("ISOdeadline");
                deadline = ZonedDateTime.parse(ISOdeadline);
            } catch (DateTimeParseException e) {
                throw new IllegalArgumentException("Invalid ISO deadline format: " + ISOdeadline, e);
            }
        }
        if(deadline != null && !Objects.equals(task.getDeadline(),deadline)){
            task.setDeadline(deadline);
        }
        if(taskName != null && taskName.length() > 0 && !Objects.equals(task.getTaskName(),taskName)){
            System.out.println("taskName");
            task.setTaskName(taskName);
        }
        if(description != null && description.length() > 0 && !Objects.equals(task.getDescription(),description)){
            System.out.println("description");
            task.setDescription(description);
        }
        if(isCompleted != null) {
            System.out.println("isCompleted");
            task.setCompleted(isCompleted);
        }
    }
}
