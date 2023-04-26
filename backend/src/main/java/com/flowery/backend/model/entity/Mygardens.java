package com.flowery.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Mygardens {

    @Id
    @Column(name = "garden_id")
    private int gardenId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "message_id")
    private Messages messageId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private Users userId;


}
