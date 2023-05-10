package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Holidays;
import com.flowery.backend.model.entity.Stores;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HolidaysRepository extends JpaRepository<Holidays, Integer> {
    List<Holidays> findAllByStoreId (Stores storeId);
}
