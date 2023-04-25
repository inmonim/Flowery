package com.flowery.backend.sevice;

import com.flowery.backend.repository.SellerRepository;
import org.springframework.stereotype.Service;

@Service
public class SellerService {

    private SellerRepository sellerRepository;

    SellerService(SellerRepository sellerRepository){
        this.sellerRepository = sellerRepository;
    }



}
