package com.flowery.backend.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ReservationDto {

    private int reservationId;

    private int userId;

    private int storeId;

    private String goodsName;

    private int price;

    private String demand;

    private LocalDateTime date;

    private int printed;

    private int permission;

}
