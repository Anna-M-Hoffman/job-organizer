package org.hoffman.jobengine.dto;
// What the frontend sends
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hoffman.jobengine.model.JobStatus;

@Data
public class JobSaverRequest {

    @NotBlank(message = "Job title is required")
    private String jobTitle;
    private String location;
    private String company;
    private Double salary;
    private Double desiredSalary;
    private String status;

    // getters & setters automatically generated with lombok
}
