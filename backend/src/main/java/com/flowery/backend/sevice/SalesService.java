package com.flowery.backend.sevice;

import com.flowery.backend.repository.SalesRepository;
import org.springframework.stereotype.Service;

@Service
public class SalesService {

    private SalesRepository salesRepository;

    SalesService(SalesRepository salesRepository){
        this.salesRepository = salesRepository;
    }



}
