package com.flowery.backend.controller;

import com.flowery.backend.model.dto.MygardensDto;
import com.flowery.backend.model.entity.Messages;
import com.flowery.backend.sevice.MessagesService;
import com.flowery.backend.sevice.MygardensService;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("messages/")
public class MessagesController {

    private MessagesService messagesService;


    MessagesController(MessagesService messagesService){
        this.messagesService = messagesService;
    }

    @PostMapping("card")
    public ResponseEntity<Messages> createCard(@RequestBody Messages messages) {
        System.out.println("카드 생성");

        return new ResponseEntity<>(messagesService.createCard(messages), HttpStatus.ACCEPTED);

    }
    @PostMapping("get-card")
    public ResponseEntity<Messages> findByMessageId(@RequestBody Map<String, Integer> requestData) {

        int a = requestData.get("messageId");

        return new ResponseEntity<>(messagesService.findByMessageId(a), HttpStatus.ACCEPTED);

    }




}
