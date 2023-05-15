package com.flowery.backend.sevice;

import com.flowery.backend.controller.MessagesController;
import com.flowery.backend.jwt.exception.BadRequestException;
import com.flowery.backend.model.dto.SellerDto;
import com.flowery.backend.model.dto.UsersDto;
import com.flowery.backend.model.entity.Seller;
import com.flowery.backend.model.entity.Users;
import com.flowery.backend.repository.SellerRepository;
import com.flowery.backend.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    private final Logger LOGGER = LoggerFactory.getLogger(MessagesController.class);
    private UsersRepository usersRepository;
    private SellerRepository sellerRepository;

    private PasswordEncoder passwordEncoder;

    UsersService(UsersRepository usersRepository, SellerRepository sellerRepository, PasswordEncoder passwordEncoder){
        this.usersRepository = usersRepository;
        this.sellerRepository = sellerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 유저 고유번호로 유저 정보를 가져옴
    public Users findByUsersId(int userId){
        return usersRepository.findById(userId).get();
    }

    public UsersDto loginCheck(UsersDto loginDto) throws Exception{

        Users users = usersRepository.findById(loginDto.getId());

        if(!passwordEncoder.matches(loginDto.getPass(), users.getPass())){
            throw new BadRequestException("아이디 혹은 비밀번호를 확인하세요.");
        }
        else{
            UsersDto usersDto = new UsersDto(users);
            return usersDto;
        }
    }
    public SellerDto sellerLoginCheck(String userId, String pass) throws Exception{

        Users users = usersRepository.findById(userId);

        SellerDto sellerDto = new SellerDto();

        if(users == null || !passwordEncoder.matches(pass, users.getPass())){
            return sellerDto;
        }

        Seller seller = sellerRepository.findByUserId(users);

        System.out.println(seller.getSellerId());

        sellerDto.setSellerId(seller.getSellerId());
        sellerDto.setStoreId(seller.getStoreId().getStoreId());
        sellerDto.setName(seller.getSellerName());
        sellerDto.setUserId(users.getUsersId());

        return sellerDto;
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
