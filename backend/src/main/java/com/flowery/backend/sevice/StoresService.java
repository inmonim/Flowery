package com.flowery.backend.sevice;

import com.flowery.backend.model.entity.Stores;
import com.flowery.backend.repository.StoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoresService {
    private StoreRepository storeRepository;

    StoresService(StoreRepository storeRepository){
        this.storeRepository = storeRepository;
    }

    public List<Stores> findAllStores(){
        return storeRepository.findAll();
    }

}
