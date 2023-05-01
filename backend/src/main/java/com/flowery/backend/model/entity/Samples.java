package com.flowery.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Samples {

    @Id
    @Column(name = "sample_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sampleId;

    @ManyToOne
    @JoinColumn(name = "goods_id")
    @JsonIgnore
    private Goods goodsId;

    @Column(name = "picture")
    private String picture;

}
