package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Reservation;
import com.flowery.backend.model.entity.Stores;
import com.flowery.backend.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    public List<Reservation> findAllByDateBetween(LocalDateTime before, LocalDateTime after);

    public List<Reservation> findByStoreIdOrderByDateAsc(Stores storeId);

    public List<Reservation> findAllByStoreIdAndDateBetween(Stores store, LocalDateTime from, LocalDateTime to);

    public List<Reservation> findAllByUserIdOrderByDateDesc(Users users);

}
