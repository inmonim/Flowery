package com.flowery.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Phrases {
    @Id
    @Column(name = "phrase_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int phraseId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "flower_id")
    private Flowers flowerId;

    @Column(name = "phrase")
    private String phrase;

}