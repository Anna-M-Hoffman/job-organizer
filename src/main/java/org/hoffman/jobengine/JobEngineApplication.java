package org.hoffman.jobengine;

import org.hoffman.jobengine.service.ExternalDataService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class JobEngineApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobEngineApplication.class, args);
    }
}
