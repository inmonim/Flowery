package com.flowery.backend.model.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Pictures {

    @Id
    @Column(name = "pictures_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pictureId;

    @Column(name = "message_id")
    private int messageId;

    @Column(name = "url")
    private String url;

}
