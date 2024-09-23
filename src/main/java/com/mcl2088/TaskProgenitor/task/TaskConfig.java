package com.mcl2088.TaskProgenitor.task;

import org.apache.catalina.valves.StuckThreadDetectionValve;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class TaskConfig {
    @Bean
    CommandLineRunner commandLineRunner(TaskRepository repository){
      return args -> {
          Task walkDog = new Task("Walk Dog","Steven", "Walk the dog for a while", LocalDate.of(2024,9,22),LocalDate.of(2024,9,19));
          Task waterCat = new Task("Refill Cat Water","Steven", "Clean and refill the cat water",LocalDate.of(2024,9,25),LocalDate.of(2024,9,19));
          repository.saveAll(List.of(walkDog,waterCat));
        };
    }
}
