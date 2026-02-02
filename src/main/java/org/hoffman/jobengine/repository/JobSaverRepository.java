package org.hoffman.jobengine.repository;

import org.hoffman.jobengine.model.JobSaver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

// Standard Spring Data JPA (Java persistence connects to databases)
public interface JobSaverRepository extends JpaRepository<JobSaver, Long> {

    List<JobSaver> findByClientId(UUID clientId);
}

