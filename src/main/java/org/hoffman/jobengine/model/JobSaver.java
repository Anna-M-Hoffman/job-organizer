package org.hoffman.jobengine.model;

// Changing the UUID to a CHAR in the database instead of BLOB
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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

    @Column(length = 36, nullable = false)
    @JdbcTypeCode(SqlTypes.CHAR)  // store as CHAR(36) instead of BLOB
    private UUID clientId; // store the client identifier

    @Column(nullable = false)
    private String jobTitle;

    private String location;
    private String company;
    private Double salary;
    private Double desiredSalary;
    @Column(nullable = true)
    private Double score; // calculated field

    @Enumerated(EnumType.STRING)
    private JobStatus status;

}
