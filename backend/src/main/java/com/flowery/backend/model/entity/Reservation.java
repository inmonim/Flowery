package com.flowery.backend.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class Reservation {

    @Id
    @Column(name = "reservation_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reservationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Users userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goods_id")
    private Goods goodsId;

    @Column(name = "price")
    private int price;

    @Column(name = "demand")
    private String demand;

    @Column(name = "date")
    private Date date;

    @Column(name = "print")
    private int print;

    @Column(name = "permission")
    private int permission;

}
