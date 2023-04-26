package com.flowery.backend.controller;

import com.flowery.backend.model.dto.ReservationDto;
import com.flowery.backend.sevice.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequestMapping("reservation/")
public class ReservationController {

    // 예약이 여기 모여있음 (예약 관련 CRUD)
    private ReservationService reservationService;

    ReservationController(ReservationService reservationService){
        this.reservationService = reservationService;
    }

    @PostMapping("hi")
    public ResponseEntity<List<ReservationDto>> findByDate(@RequestBody ReservationDto dto){

        System.out.println(dto.getDate());

        return new ResponseEntity<>(reservationService.findTodayReservation(dto), HttpStatus.ACCEPTED);
    }


}
