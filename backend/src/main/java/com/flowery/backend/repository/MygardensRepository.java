package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Mygardens;
import com.flowery.backend.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MygardensRepository extends JpaRepository<Mygardens, Integer> {

    public List<Mygardens> findAllByUserId(Users usersId);


}
