package com.flowery.backend.model.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_id")
    private int usersId;

    @Column(name = "id")
    private String id;

    @Column(name = "pass")
    private String pass;

    @Column(name="phone")
    private String phone;

    @Column(name = "nick_name")
    private String nickName;

}
