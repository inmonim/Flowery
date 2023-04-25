package com.flowery.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class Seller {

    @Id
    @Column(name = "seller_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sellerId;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Users userId;

    @JoinColumn(name = "store_id")
    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    private Stores storeId;

    @Column(name = "name")
    private String name;

}
