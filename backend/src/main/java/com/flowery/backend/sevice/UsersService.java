package com.flowery.backend.sevice;

import com.flowery.backend.model.entity.Users;
import com.flowery.backend.repository.SellerRepository;
import com.flowery.backend.repository.UsersRepository;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    private UsersRepository usersRepository;
    private SellerRepository sellerRepository;

    UsersService(UsersRepository usersRepository){
        this.usersRepository = usersRepository;
    }

    // 유저 고유번호로 유저 정보를 가져옴
    public Users findByUsersId(int userId){
        return usersRepository.findById(userId).get();
    }


}
