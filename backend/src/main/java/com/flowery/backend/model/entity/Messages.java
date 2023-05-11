package com.flowery.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Messages {

    @Id
    @Column(name = "message_id")
    private String messageId;

    @Column(name = "message")
    private String message;

    @Column(name = "video")
    private String video;

    @Column(name = "flower_picture")
    private String flowerPicture;

    @Column(name = "paper")
    private int paper;

    @Column(name = "font")
    private int font;

    @Column(name = "message_date")
    private LocalDateTime messageDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "poem_id")
    private Poems poemId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "phrase_id")
    private Phrases phraseId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "mean_id")
    private Meaning meanId;


}
