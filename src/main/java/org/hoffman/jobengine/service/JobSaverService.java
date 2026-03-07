package org.hoffman.jobengine.service;
// Core business logic

import lombok.Data;
import org.hoffman.jobengine.dto.JobSaverRequest;
import org.hoffman.jobengine.model.JobSaver;
import org.hoffman.jobengine.model.JobStatus;
import org.hoffman.jobengine.repository.JobSaverRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Data
@Service
public class JobSaverService {

    private final JobSaverRepository repository;
    public JobSaverService(JobSaverRepository repository) {
        this.repository = repository;
    }
    public JobSaver createJob(UUID clientId, JobSaverRequest request) {
        if (request.getJobTitle() == null || request.getJobTitle().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Job title is required");
        }

//        JobSaver job = new JobSaver();
//        job.setClientId(clientId);
//        job.setJobTitle(request.getJobTitle());
//        job.setLocation(request.getLocation());
//        job.setSalary(request.getSalary());
//        job.setDesiredSalary(request.getDesiredSalary());
//        job.setCompany(request.getCompany());


        JobSaver job = new JobSaver();
        job.setClientId(clientId);
        job.setJobTitle(request.getJobTitle());
        job.setLocation(request.getLocation() != null && !request.getLocation().isBlank()
                ? request.getLocation() : null);
        job.setCompany(request.getCompany() != null && !request.getCompany().isBlank()
                ? request.getCompany() : null);
        job.setSalary(request.getSalary());
        job.setDesiredSalary(request.getDesiredSalary());
        job.setStatus(request.getStatus() == null || request.getStatus().isBlank()
                ? JobStatus.PENDING
                : JobStatus.valueOf(request.getStatus().toUpperCase()));

        if (job.getSalary() != null && job.getDesiredSalary() != null && job.getDesiredSalary() != 0) {
            job.setScore(job.getSalary() / job.getDesiredSalary());
        } else {
            job.setScore(null);
        }

        return repository.save(job);
    }

    public List<JobSaver> getJob(UUID clientId) {
        return repository.findByClientId(clientId);
    }

    public void deleteJob(Long id, UUID clientId) {

        JobSaver job = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getClientId().equals(clientId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized delete attempt");
        }

        repository.delete(job);
    }
}
