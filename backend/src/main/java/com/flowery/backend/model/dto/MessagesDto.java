package com.flowery.backend.model.dto;

import lombok.Data;

@Data
public class MessagesDto {

    private String messageId;
    private String message;
    private String video;
    private String flowerPicture;
    private int papers;
}
