package com.flowery.backend.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ReservationDto {

    private int reservationId;

    private Integer userId;

    private Integer storeId;

    private Integer messageId;

    private String goodsName;

    private int price;

    private String demand;

    private LocalDateTime date;

    private int printed;

    private int permission;

    private String reservationName;

    private String phrase;

}
