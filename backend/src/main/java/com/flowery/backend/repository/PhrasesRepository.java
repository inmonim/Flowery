package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Phrases;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhrasesRepository extends JpaRepository<Phrases, Integer> {
}
