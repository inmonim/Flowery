package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    public List<Reservation> findAllByDateBetween(LocalDateTime before, LocalDateTime after);

}
