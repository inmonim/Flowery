package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Integer> {

    Users findById(String userId);

    boolean findByPhone(String phone);

    Users findByUsersId(int userId);

}
