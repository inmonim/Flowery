package com.flowery.backend.controller;

import com.flowery.backend.model.dto.CardDto;
import com.flowery.backend.model.dto.ReservationDto;
import com.flowery.backend.model.entity.Reservation;
import com.flowery.backend.sevice.MessagesService;
import com.flowery.backend.sevice.ReservationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("reservation")
public class ReservationController {

    // 예약이 여기 모여있음 (예약 관련 CRUD)
    private ReservationService reservationService;
    private final Logger LOGGER = LoggerFactory.getLogger(ReservationController.class);

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

    // 한 가게에 등록된 예약들을 찾아옴.
    @PostMapping("/store")
    public ResponseEntity<List<ReservationDto>> findByStoreId(@RequestBody Map<String, Integer> requestData){
        LOGGER.info("findByStoreId가 호출되었습니다.");
        int storeId = requestData.get("storeId");

        return new ResponseEntity<List<ReservationDto>>(reservationService.findByStoreId(storeId), HttpStatus.ACCEPTED);
    }

    // 등록된 예약을 승인시킴
    @PostMapping("/accept")
    public ResponseEntity<ReservationDto> acceptReservation (@RequestBody Map<String, Integer> requestData){
        LOGGER.info("acceptReservation가 호출되었습니다.");
        int reservationId = requestData.get("reservationId");

        return new ResponseEntity<ReservationDto>(reservationService.acceptReservation(reservationId), HttpStatus.ACCEPTED);
    }

    @PostMapping("/make")
    public ResponseEntity<Boolean> createReservation (@RequestBody ReservationDto reservationDto){
        LOGGER.info("createReservation이 호출되었습니다.");

        try{
            boolean result = reservationService.makeReservation(reservationDto);

            if(result) return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);

        }catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/card")
    public ResponseEntity<CardDto> getCardInfo (@RequestParam Integer reservationId) {
        LOGGER.info("printCard가 호출되었습니다.");

        try {
            CardDto card = reservationService.getcardInfo(reservationId);
            return ResponseEntity.ok()
                    .body(card);
        } catch (ReservationService.ReservationNotFoundException e) {
            LOGGER.error("예약을 찾을 수 없습니다.", e);
            return ResponseEntity.notFound()
                    .build();
        } catch (Exception e) {
            LOGGER.error("카드 출력에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

}
