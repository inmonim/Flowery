package com.flowery.backend.model.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Messages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private int messageId;

    @Column(name = "message")
    private String message;

    @Column(name = "video")
    private String video;

    @Column(name = "flower_picture")
    private String flowerPicture;

    @Column(name = "paper")
    private int paper;

}
