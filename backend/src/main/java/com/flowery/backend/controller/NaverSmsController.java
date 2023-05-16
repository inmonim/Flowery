package com.flowery.backend.controller;

import com.flowery.backend.model.dto.SmsMessageDto;
import com.flowery.backend.model.dto.SmsResponseDTO;
import com.flowery.backend.sevice.NaverSmsService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

@Controller
@RequestMapping("sms")
public class NaverSmsController {

    private NaverSmsService naverSmsService;

    NaverSmsController(NaverSmsService naverSmsService){
        this.naverSmsService = naverSmsService;
    }

    @PostMapping("/send-sms")
    public ResponseEntity<SmsResponseDTO> sendSms(@RequestBody SmsMessageDto smsMessageDto) throws Exception{
        SmsResponseDTO smsResponseDTO =  naverSmsService.sendSms(smsMessageDto);
        return new ResponseEntity<>(smsResponseDTO, HttpStatus.ACCEPTED);
    }



}

