package com.flowery.backend.controller;

import com.flowery.backend.model.dto.SellerDto;
import com.flowery.backend.model.dto.UsersDto;
import com.flowery.backend.redis.PasswordGenerator;
import com.flowery.backend.redis.SmsCertificationDao;
import com.flowery.backend.sevice.StoresService;
import com.flowery.backend.sevice.UsersService;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.GET;

import java.util.Random;


@Controller
@RequestMapping("users")
public class UsersController {

    // Users에서 로그인 관련, 일반 유저, 판매자 구분 가능
    private UsersService usersService;
    private StoresService storesService;
    final DefaultMessageService messageService;

    private final SmsCertificationDao smsCertificationDao;
    private final int LIMIT_TIME = 3 * 60;  // (2)

    UsersController(UsersService usersService, StoresService storesService, SmsCertificationDao smsCertificationDao){
        this.usersService = usersService;
        this.storesService = storesService;
        this.smsCertificationDao = smsCertificationDao;
        this.messageService = NurigoApp.INSTANCE.initialize("NCSCFJLKKGWYQQ0R", "SS1RDBJ0LYUXJGE5YLYK1EMMSJYKKBNJ", "https://api.coolsms.co.kr");
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
    @PostMapping("/send-one")
    public SingleMessageSentResponse sendOne(@RequestBody UsersDto usersDto) {
        Message message = new Message();
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom("01053270972");

        String phone = usersDto.getPhone().replaceAll("-","");

        message.setTo(phone);
        message.setText("[Flowery] 꽃들 예약 완료 되었습니다. 하하 i got you baby");

        Random random = new Random();
        int randomNumber = random.nextInt(900000) + 100000; // 100,000 ~ 999,999 범위에서 랜덤으로 수를 생성

        String code = String.valueOf(randomNumber);

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        System.out.println(response);

        smsCertificationDao.createSmsCertification(usersDto.getPhone(),code);

        System.out.println(code);

        return response;
    }

    @PostMapping("/send-pass")
    public ResponseEntity<Boolean> sendPass(@RequestBody UsersDto usersDto) {

        Message message = new Message();

        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom("01053270972");

        String phone = usersDto.getPhone().replaceAll("-","");

        message.setTo(phone);
        message.setText("[Flowery] 발급된 임시 비밀번호는 아래와 같습니다. oh yes!\n"+PasswordGenerator.generatePassword());

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));

        return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
    }

    @PostMapping("check")
    public ResponseEntity<Boolean> phoneCheck(@RequestBody UsersDto usersDto){
        String value = smsCertificationDao.getSmsCertification(usersDto.getPhone());

        if(value==null || !value.equals(usersDto.getPass())){
            return new ResponseEntity<>(false, HttpStatus.ACCEPTED);
        }

        smsCertificationDao.removeSmsCertification(usersDto.getPhone());

        return new ResponseEntity<>(true, HttpStatus.ACCEPTED);

    }

}
