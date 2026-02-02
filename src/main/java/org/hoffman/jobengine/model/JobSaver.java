package org.hoffman.jobengine.model;

import java.util.UUID;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

// What gets persisted

@Entity
@Table(name = "jobs_saved")
@Data                 // generates getters, setters, toString, equals, hashCode
@NoArgsConstructor     // generates no-arg constructor
@AllArgsConstructor    // generates all-arg constructor
public class JobSaver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private UUID clientId; // store the client identifier
    private String jobTitle;
    private String location;
    private String company;
    private double salary;
    private double desiredSalary;
    private String status;
    private double score; // calculated field
}
