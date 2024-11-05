package com.mcl2088.TaskProgenitor.task;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Configuration
public class TaskConfig {
    @Bean
    CommandLineRunner commandLineRunner(TaskRepository repository){
      return args -> {
          Task walkDog = new Task(
                  "Walk Dog",
                  "Steven",
                  "Walk the dog for a while",
                  ZonedDateTime.of(2024, 11, 11, 0, 0, 0, 0,
                          ZoneId.of("America/Los_Angeles")).toString(),
                  ZonedDateTime.now( ZoneId.of("America/Los_Angeles")).toString());
          Task waterCat = new Task("Refill Cat Water",
                  "Steven",
                  "Clean and refill the cat water",
                  ZonedDateTime.of(2024, 11, 10, 0, 0, 0, 0,
                          ZoneId.of("America/Los_Angeles")).toString(),
                  ZonedDateTime.now( ZoneId.of("America/Los_Angeles")).toString());
          repository.saveAll(List.of(walkDog,waterCat));
        };
    }
}
