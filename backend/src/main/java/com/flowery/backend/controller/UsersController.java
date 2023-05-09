package com.flowery.backend.controller;

import com.flowery.backend.model.dto.SellerDto;
import com.flowery.backend.model.dto.UsersDto;
import com.flowery.backend.model.entity.Users;
import com.flowery.backend.sevice.StoresService;
import com.flowery.backend.sevice.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("users")
public class UsersController {

    // Users에서 로그인 관련, 일반 유저, 판매자 구분 가능
    private UsersService usersService;
    private StoresService storesService;

    UsersController(UsersService usersService, StoresService storesService){
        this.usersService = usersService;
        this.storesService = storesService;
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody UsersDto usersDto){

        try {
            return new ResponseEntity<>(usersService.loginCheck(usersDto.getId(), usersDto.getPass()), HttpStatus.ACCEPTED);
        }catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/login-seller")
    public ResponseEntity<SellerDto> login_seller(@RequestBody UsersDto usersDto){

        try {
            SellerDto sellerDto = usersService.sellerLoginCheck(usersDto.getId(), usersDto.getPass());
            if(sellerDto.getUserId() <0 ){
                return new ResponseEntity<>(sellerDto, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(sellerDto, HttpStatus.ACCEPTED);
        }catch (Exception e){
            SellerDto sellerDto = new SellerDto();
            return new ResponseEntity<>(sellerDto, HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/register")
    public ResponseEntity<Boolean> register(@RequestBody UsersDto usersDto){

        try {
            System.out.println(usersDto.getPhone());
            return new ResponseEntity<>(usersService.register(usersDto), HttpStatus.ACCEPTED);
        }catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

    }

}
