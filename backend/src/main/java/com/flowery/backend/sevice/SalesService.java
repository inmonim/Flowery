package com.flowery.backend.sevice;

import com.flowery.backend.model.dto.SalesDto;
import com.flowery.backend.model.entity.Reservation;
import com.flowery.backend.model.entity.Sales;
import com.flowery.backend.repository.ReservationRepository;
import com.flowery.backend.repository.SalesRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SalesService {

    private SalesRepository salesRepository;
    private ReservationRepository reservationRepository;

    SalesService(SalesRepository salesRepository, ReservationRepository reservationRepository){
        this.salesRepository = salesRepository;
        this.reservationRepository = reservationRepository;
    }

    public List<SalesDto> findByReservationId(int reservationId){

        List<SalesDto> result = new ArrayList<>();

        Reservation reservation = reservationRepository.findById(reservationId).get();

        List<Sales> tmp = salesRepository.findAllByReservationId(reservation);

        for(int i=0; i< tmp.size(); i++){
            SalesDto salesDto = new SalesDto();

            salesDto.setReservationId(reservationId);
            salesDto.setSaleId(tmp.get(i).getSaleId());
            salesDto.setDate(tmp.get(i).getSaleDate());
            salesDto.setCount(tmp.get(i).getCount());
            salesDto.setFlowerId(tmp.get(i).getFlowerId().getFlowerId());

            result.add(salesDto);
        }

        return result;

    }



}
