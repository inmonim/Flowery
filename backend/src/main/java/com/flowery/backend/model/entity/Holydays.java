package com.flowery.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Holydays {

    @Id
    @Column(name = "holyday_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int holydayId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "store_id")
    private Stores StoreId;

    @Column(name = "day")
    private int day;

}
