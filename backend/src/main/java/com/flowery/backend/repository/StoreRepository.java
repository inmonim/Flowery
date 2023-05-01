package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Stores;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Stores, Integer> {
}
