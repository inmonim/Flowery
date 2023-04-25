package com.flowery.backend.sevice;

import com.flowery.backend.repository.ReservationRepository;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    private ReservationRepository reservationRepository;

    ReservationService(ReservationRepository reservationRepository){
        this.reservationRepository = reservationRepository;
    }

}
