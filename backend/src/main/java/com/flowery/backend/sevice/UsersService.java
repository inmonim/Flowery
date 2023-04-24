package com.flowery.backend.sevice;

import com.flowery.backend.model.entity.Users;
import com.flowery.backend.repository.UsersRepository;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    private UsersRepository usersRepository;

    UsersService(UsersRepository usersRepository){
        this.usersRepository = usersRepository;
    }

    public Users findByUsersId(int user_id){
        return usersRepository.findById(user_id).get();
    }

}
