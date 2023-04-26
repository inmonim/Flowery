package com.flowery.backend.sevice;

import com.flowery.backend.repository.HolydaysRepository;
import org.springframework.stereotype.Service;

@Service
public class HolydaysService {

    private HolydaysRepository holydaysRepository;

    HolydaysService(HolydaysRepository holydaysRepository){
        this.holydaysRepository = holydaysRepository;
    }



}
