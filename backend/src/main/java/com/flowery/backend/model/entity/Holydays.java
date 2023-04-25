package com.flowery.backend.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Holydays {

    @Id
    @Column(name = "holyday_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int holydayId;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Stores StoreId;

    @Column(name = "day")
    private int day;

}
