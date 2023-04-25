package com.flowery.backend.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Messages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private int messageId;

    @Column(name = "mesage")
    private String message;

    @Column(name = "video")
    private String video;

    @Column(name = "picture")
    private String picture;

}
