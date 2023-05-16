package com.flowery.backend.controller;

import com.flowery.backend.jwt.JwtProvider;
import com.flowery.backend.jwt.TokenResponse;
import com.flowery.backend.model.dto.SellerDto;
import com.flowery.backend.model.dto.UsersDto;
import com.flowery.backend.redis.PasswordGenerator;
import com.flowery.backend.redis.RedisDao;
import com.flowery.backend.sevice.StoresService;
import com.flowery.backend.sevice.UsersService;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Random;


@Controller
@RequestMapping("users")
public class UsersController {

    // Users에서 로그인 관련, 일반 유저, 판매자 구분 가능
    private UsersService usersService;
    final DefaultMessageService messageService;
    private final JwtProvider jwtProvider;

    UsersController(UsersService usersService, JwtProvider jwtProvider){
        this.usersService = usersService;
        this.jwtProvider =jwtProvider;
        this.messageService = NurigoApp.INSTANCE.initialize("NCSCFJLKKGWYQQ0R", "SS1RDBJ0LYUXJGE5YLYK1EMMSJYKKBNJ", "https://api.coolsms.co.kr");
    }

    // 유저용 로그인
    @PostMapping("/login-user")
    public ResponseEntity<TokenResponse> loginUser(@RequestBody UsersDto loginDto) {
        try {
            UsersDto usersDto = usersService.loginCheck(loginDto);
            return new ResponseEntity<>(jwtProvider.createTokensByLogin(usersDto), HttpStatus.ACCEPTED);
        }catch (Exception e){
            throw new RuntimeException("회원 정보를 다시 확인해주세요");
        }
    }


    // 판매자 로그인
    @PostMapping("/login-seller")
    public ResponseEntity<TokenResponse> loginSeller(@RequestBody UsersDto loginDto){

        try {
            UsersDto usersDto = usersService.loginCheck(loginDto);
            usersService.sellerLoginCheck(loginDto.getId(), loginDto.getPass());
            return new ResponseEntity<>(jwtProvider.createTokensBySellerLogin(usersDto), HttpStatus.ACCEPTED);
        }catch (Exception e){
            throw new RuntimeException("회원 정보를 다시 확인해주세요");
        }

    }

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<Boolean> register(@RequestBody UsersDto usersDto){

        try {
            System.out.println(usersDto.getPhone());
            return new ResponseEntity<>(usersService.register(usersDto), HttpStatus.ACCEPTED);
        }catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

    }

    //ㅇ

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<Boolean> logout(@RequestBody UsersDto loginDto){
        try {
            usersService.logout(loginDto);

        }catch (Exception e){
            throw new RuntimeException("login 정보가 없습니다!");
        }
        return new ResponseEntity<>(true,HttpStatus.ACCEPTED);
    }

}
