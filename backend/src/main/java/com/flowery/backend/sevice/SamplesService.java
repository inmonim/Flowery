package com.flowery.backend.sevice;

import com.flowery.backend.repository.SamplesRepository;
import org.springframework.stereotype.Service;

@Service
public class SamplesService {

    private SamplesRepository samplesRepository;

    SamplesService(SamplesRepository samplesRepository){
        this.samplesRepository = samplesRepository;
    }

}
