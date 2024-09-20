package com.mcl2088.TaskProgenitor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@SpringBootApplication
public class TaskProgenitorApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskProgenitorApplication.class, args);

	}
	@GetMapping
	public List<String> hello(){
		return List.of("Task", "Manager");
	}

}
