package org.hoffman.jobengine.service;
// Core business logic

import org.hoffman.jobengine.dto.JobOfferRequest;
import org.hoffman.jobengine.model.JobOffer;
import org.hoffman.jobengine.repository.JobOfferRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class JobOfferService {

    private final JobOfferRepository repository;
    private final ExternalDataService externalDataService;

    public JobOfferService(JobOfferRepository repository,
                           ExternalDataService externalDataService) {
        this.repository = repository;
        this.externalDataService = externalDataService;
    }

    public JobOffer createOffer(UUID clientId, JobOfferRequest request) {

        double costOfLiving = externalDataService.getCostOfLivingIndex(request.getLocation());
        double growth = externalDataService.getCareerGrowthScore(request.getJobTitle());

        double salary = request.getOfferSalary();
        double normalizedSalary = salary / costOfLiving;

        double score =
                normalizedSalary * request.getSalaryWeight()
                        + growth * request.getGrowthWeight()
                        + (1 / costOfLiving) * request.getLocationWeight();

        JobOffer offer = new JobOffer();
        offer.setClientId(clientId);
        offer.setJobTitle(request.getJobTitle());
        offer.setLocation(request.getLocation());
        offer.setOfferSalary(request.getOfferSalary());
        offer.setNormalizedSalary(normalizedSalary);
        offer.setScore(score);

        return repository.save(offer);
    }

    public List<JobOffer> getOffers(UUID clientId) {
        return repository.findByClientId(clientId);
    }
}
