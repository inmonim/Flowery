package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Meaning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeaningRepository extends JpaRepository<Meaning, Integer> {

}
