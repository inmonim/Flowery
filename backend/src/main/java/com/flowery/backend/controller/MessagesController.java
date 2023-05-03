package com.flowery.backend.controller;

import com.flowery.backend.amazon.S3Uploader;
import com.flowery.backend.model.entity.Messages;
import com.flowery.backend.sevice.MessagesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("messages")
public class MessagesController {
    private final Logger LOGGER = LoggerFactory.getLogger(MessagesController.class);
    private MessagesService messagesService;
    private final S3Uploader s3Uploader;

    MessagesController(MessagesService messagesService, S3Uploader s3Uploader){
        this.messagesService = messagesService;
        this.s3Uploader = s3Uploader;
    }

    @PostMapping("/card")
    public ResponseEntity<Messages> createCard(@RequestPart(required = false) MultipartFile[] pictures,
                                               @RequestPart(required = false) MultipartFile video,
                                               @RequestParam Integer paper, @RequestParam String message) throws Exception {
        LOGGER.info("createCard가 호출되었습니다.");

        try {
            String videoUrl = null;
            List<String> pictureUrl = new ArrayList<>();
            String messageValue = null;
            Integer paperValue = 0;

            if(!video.isEmpty()){
                videoUrl = s3Uploader.uploadFile(video);
            }

            for(int i=0; i<pictures.length; i++){
                String tmp = s3Uploader.uploadFile(pictures[i]);
                pictureUrl.add(tmp);
            }

            if(message != null || !message.equals("")){
                messageValue = message;
            }

            if(-1< paper && paper < 3){
                paperValue = paper;
            }

            return new ResponseEntity<>(messagesService.createCard(videoUrl, pictureUrl, messageValue, paperValue), HttpStatus.ACCEPTED);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }


    }
    @PostMapping("/get-card")
    public ResponseEntity<Messages> findByMessageId(@RequestBody Map<String, Integer> requestData) {
        LOGGER.info("findByMessageId가 호출되었습니다.");
        int a = requestData.get("messageId");

        return new ResponseEntity<>(messagesService.findByMessageId(a), HttpStatus.ACCEPTED);
    }


}
