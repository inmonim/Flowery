package com.flowery.backend.model.dto;

import lombok.Data;

import javax.persistence.Column;

@Data
public class UsersDto {

    private String id;

    private String pass;

    private String phone;
}
