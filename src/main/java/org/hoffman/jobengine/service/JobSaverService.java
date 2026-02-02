package org.hoffman.jobengine.service;
// Core business logic

import lombok.Data;
import org.hoffman.jobengine.dto.JobSaverRequest;
import org.hoffman.jobengine.model.JobSaver;
import org.hoffman.jobengine.repository.JobSaverRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Data
@Service
public class JobSaverService {

    private final JobSaverRepository repository;

    public JobSaver createOffer(UUID clientId, JobSaverRequest request) {

        double salary = request.getSalary();
        double desiredSalary = request.getDesiredSalary();

        double score = salary / desiredSalary;

        JobSaver offer = new JobSaver();
        offer.setClientId(clientId);
        offer.setJobTitle(request.getJobTitle());
        offer.setLocation(request.getLocation());
        offer.setSalary(request.getSalary());
        offer.setDesiredSalary(request.getDesiredSalary());
        offer.setScore(score);

        return repository.save(offer);
    }

    public List<JobSaver> getOffers(UUID clientId) {
        return repository.findByClientId(clientId);
    }
}
