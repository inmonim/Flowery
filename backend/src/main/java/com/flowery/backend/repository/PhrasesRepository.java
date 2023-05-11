package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Phrases;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhrasesRepository extends JpaRepository<Phrases, Integer> {
}
