package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Pictures;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PicturesRepository extends JpaRepository<Pictures, Integer> {
}
