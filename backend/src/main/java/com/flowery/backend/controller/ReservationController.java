package com.flowery.backend.controller;

import com.flowery.backend.model.dto.ReservationDto;
import com.flowery.backend.sevice.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Controller
@RequestMapping("reservation/")
public class ReservationController {

    // 예약이 여기 모여있음 (예약 관련 CRUD)
    private ReservationService reservationService;

    ReservationController(ReservationService reservationService){
        this.reservationService = reservationService;
    }

    // test
    @GetMapping("hi")
    public ResponseEntity<List<ReservationDto>> findByDate(@RequestParam String date){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(date, formatter);
        System.out.println(dateTime);

        return new ResponseEntity<>(reservationService.findTodayReservation(dateTime), HttpStatus.ACCEPTED);
    }


}
