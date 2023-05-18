package com.flowery.backend.model.dto;

import lombok.Data;

import javax.persistence.Column;

@Data
public class StoresDto {
    private int storeId;

    private String storeName;

    private String storePhone;

    private int permit;

    private int open;

    private int close;

    private String address;

    private String info;

    private String image;

    private String profile;
}
