package com.moneyManager.MoneyManagerAPI;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MoneyManagerApiApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(MoneyManagerApiApplication.class, args);
		openHomePage();
	}

	private static void openHomePage() throws IOException {
		Runtime rt = Runtime.getRuntime();
		rt.exec("google-chrome http://localhost:8080");
	}
}
