package com.mcl2088.TaskProgenitor.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/tasks")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }
    @GetMapping
    public List<Task> getTasks(){
        return taskService.getTasks();
    }
    @PostMapping
    public void addTask(@RequestBody Task task){
        taskService.addTask(task);
    }
    @DeleteMapping(path = "{taskId}")
    public void deleteTask(@PathVariable("taskId") Long taskId){
        taskService.deleteTask(taskId);

    }
    @PutMapping(path = "{taskId}")
    public void updateTask(@PathVariable("taskId") Long taskId,
                           @RequestParam(required = false) String ISOdeadline,
                           @RequestParam(required = false) String taskName,
                           @RequestParam(required = false) String description,
                           @RequestParam(required = false) Boolean completed){
        taskService.updateTask(taskId, ISOdeadline, taskName, description, completed);

    }

}
