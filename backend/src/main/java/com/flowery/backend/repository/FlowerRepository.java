package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Flowers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlowerRepository extends JpaRepository<Flowers, Integer> {
}
