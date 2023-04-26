package com.flowery.backend.controller;

import com.flowery.backend.sevice.FlowerService;
import com.flowery.backend.sevice.ReservationService;
import com.flowery.backend.sevice.SalesService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("sales/")
public class SalesController {

    // sales에서 판매 기록이 나옴 (매출, 꽃 나간 량)
    private SalesService salesService;
    private FlowerService flowerService;
    private ReservationService reservationService;


}
