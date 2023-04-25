package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Samples;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SamplesRepository extends JpaRepository<Samples, Integer> {
}
