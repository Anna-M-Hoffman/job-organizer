package org.hoffman.jobengine.controller;
// Exposes REST API

import org.hoffman.jobengine.dto.JobSaverRequest;
import org.hoffman.jobengine.model.JobSaver;
import org.hoffman.jobengine.service.JobSaverService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/jobs")
public class JobSaverController {

    private final JobSaverService service;

    public JobSaverController(JobSaverService service) {
        this.service = service;
    }


    @GetMapping
    public List<JobSaver> getOffers(
            @RequestParam UUID clientId) {

        return service.getJob(clientId);
    }


    @PostMapping
    public JobSaver createOffer(
            @RequestHeader("X-Client-Id") UUID clientId,
            @Valid @RequestBody JobSaverRequest request) {

        return service.createJob(clientId, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(
            @PathVariable Long id,
            @RequestHeader("X-Client-Id") UUID clientId) {

        service.deleteJob(id, clientId);
        return ResponseEntity.ok().build();
    }
}

