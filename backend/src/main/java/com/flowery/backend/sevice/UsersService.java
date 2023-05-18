package com.flowery.backend.sevice;

import com.flowery.backend.model.dto.UsersDto;
import com.flowery.backend.model.entity.Users;
import com.flowery.backend.repository.SellerRepository;
import com.flowery.backend.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    private UsersRepository usersRepository;
    private SellerRepository sellerRepository;

    private PasswordEncoder passwordEncoder;

    UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder){
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 유저 고유번호로 유저 정보를 가져옴
    public Users findByUsersId(int userId){
        return usersRepository.findById(userId).get();
    }

    public boolean loginCheck(String userId, String pass) throws Exception{

        Users users = usersRepository.findById(userId);

        if(users == null || !passwordEncoder.matches(pass, users.getPass())){
            return false;
        }
        else return true;
    }

    public boolean register(UsersDto usersDto) throws Exception{
        String encryptedPass = passwordEncoder.encode(usersDto.getPass());

        Users users = new Users();
        users.setId(usersDto.getId());
        users.setPass(encryptedPass);
        users.setPhone(usersDto.getPhone());

        usersRepository.save(users);

        return true;

    }

}
