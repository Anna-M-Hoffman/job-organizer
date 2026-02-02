package org.hoffman.jobengine.dto;
// What the frontend sends

import lombok.Data;

@Data
public class JobSaverRequest {

    private String jobTitle;
    private String location;
    private String company;
    private double salary;
    private double desiredSalary;
    private String status;

    // getters & setters automatically generated with lombok
}
