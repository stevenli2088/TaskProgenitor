package com.mcl2088.TaskProgenitor.task;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
public class TaskService {
    public List<Task> getTasks(){
        Task walkDog = new Task(1,"Walk Dog","Steven", "Walk the dog for a while", LocalDate.of(2024,9,25),45,LocalDate.of(2024,9,19));
        Task waterCat = new Task(2,"Refill Cat Water","Steven", "Clean and refill the cat water",LocalDate.of(2024,9,25),45,LocalDate.of(2024,9,19));
        return List.of(walkDog,waterCat);
    }
}
