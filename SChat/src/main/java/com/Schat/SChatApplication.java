package com.Schat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.Schat.Repository")
public class SChatApplication {

	public static void main(String[] args) {
		SpringApplication.run(SChatApplication.class, args);
	}

}
