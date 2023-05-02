package com.flowery.backend.sevice;

import com.flowery.backend.model.dto.ReservationDto;
import com.flowery.backend.model.entity.Reservation;
import com.flowery.backend.model.entity.Stores;
import com.flowery.backend.repository.ReservationRepository;
import com.flowery.backend.repository.StoreRepository;
import org.springframework.stereotype.Service;

import javax.swing.text.html.parser.Entity;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ReservationService {

    // 예약 거부, 승인, 확인 등이 여기 있음

    private ReservationRepository reservationRepository;
    private StoreRepository storeRepository;

    ReservationService(ReservationRepository reservationRepository, StoreRepository storeRepository){
        this.reservationRepository = reservationRepository;
        this.storeRepository = storeRepository;
    }

    public List<ReservationDto> findTodayReservation(LocalDateTime dateTime){

        LocalDateTime yesterday = LocalDateTime.of(LocalDate.from(dateTime), LocalTime.of(0,0,0));
        LocalDateTime today = LocalDateTime.of(LocalDate.from(dateTime), LocalTime.of(23,59,59));

        List<Reservation> list = reservationRepository.findAllByDateBetween(yesterday,today);
        List<ReservationDto> result = new ArrayList<>();

        for(int i=0; i<list.size(); i++){

            ReservationDto tmp = new ReservationDto();

            reservationEntityToDto(tmp, list.get(i));

            result.add(tmp);
        }

        return result;

    }

    public List<ReservationDto> findByStoreId(int storeId) {
        List<ReservationDto> result = new ArrayList<>();

        Stores store = storeRepository.findById(storeId).get();
        List<Reservation> list = reservationRepository.findByStoreId(store);

        for(int i=0; i<list.size(); i++){

            ReservationDto tmp = new ReservationDto();

            reservationEntityToDto(tmp, list.get(i));

            result.add(tmp);
        }

        return result;


    }

    public ReservationDto acceptReservation (int reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId).get();
        reservation.setPermission(1);
        reservationRepository.save(reservation);
        ReservationDto tmp = new ReservationDto();
        reservationEntityToDto(tmp, reservation);

        return tmp;

    }

    public void reservationEntityToDto(ReservationDto tmp, Reservation reservation){

        tmp.setReservationId(reservation.getReservationId());
        tmp.setDate(reservation.getDate());
        tmp.setPrice(reservation.getPrice());
        tmp.setDemand(reservation.getDemand());
        tmp.setPermission(reservation.getPermission());
        tmp.setPrinted(reservation.getPrinted());
        tmp.setUserId(reservation.getUserId().getUsersId());
        tmp.setStoreId(reservation.getStoreId().getStoreId());
        tmp.setGoodsName(reservation.getGoodsName());

        return;

    }

}
