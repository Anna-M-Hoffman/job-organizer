package org.hoffman.jobengine.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;



// Isolates APIs and datasets
@Service
public class ExternalDataService {

    //private final RestTemplate restTemplate;

    //@Value("${api.ninjas.key}")
    //private String apiKey;

    //public ExternalDataService(RestTemplate restTemplate) {
     //   this.restTemplate = restTemplate;
    //}


    public double getCostOfLivingIndex(String location) {
        // TODO: replace with real dataset or API
        return 1.15; // example multiplier
    }


    public double getCareerGrowthScore(String jobTitle) {
        // TODO: BLS API later
        return 0.75;
    }

}




