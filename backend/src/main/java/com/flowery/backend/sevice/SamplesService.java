package com.flowery.backend.sevice;

import com.flowery.backend.model.entity.Samples;
import com.flowery.backend.repository.SamplesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SamplesService {

    // 철거!

    private SamplesRepository samplesRepository;

    SamplesService(SamplesRepository samplesRepository){
        this.samplesRepository = samplesRepository;
    }


}
