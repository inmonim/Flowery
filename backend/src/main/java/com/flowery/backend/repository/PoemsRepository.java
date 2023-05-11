package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Poems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoemsRepository extends JpaRepository<Poems, Integer> {
}
