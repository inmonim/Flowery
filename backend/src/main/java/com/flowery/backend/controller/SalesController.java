package com.flowery.backend.controller;

import com.flowery.backend.model.dto.SalesDto;
import com.flowery.backend.sevice.FlowerService;
import com.flowery.backend.sevice.ReservationService;
import com.flowery.backend.sevice.SalesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("sales/")
public class SalesController {

    // sales에서 판매 기록이 나옴 (매출, 꽃 나간 량)
    private SalesService salesService;


    SalesController(SalesService salesService, FlowerService flowerService, ReservationService reservationService){
        this.salesService = salesService;
    }

    @GetMapping("hi")
    public ResponseEntity<List<SalesDto>> hi(@RequestParam int reservationId){
        return new ResponseEntity<>(salesService.findByReservationId(reservationId), HttpStatus.ACCEPTED);
    }


}
