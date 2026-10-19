package com.skoolix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SkoolixServerApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(SkoolixServerApplication.class, args);
		start();
	}
	
	private static void start() {
		System.out.println("***************************************************************");
		System.out.println("*****************-------------------------*********************");
		System.out.println("****************| Spring Boot App Started |********************");
		System.out.println("*****************-------------------------*********************");
		System.out.println("***************************************************************");
		
	}
	
}