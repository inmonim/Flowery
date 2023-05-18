package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Holydays;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HolydaysRepository extends JpaRepository<Holydays, Integer> {
}
