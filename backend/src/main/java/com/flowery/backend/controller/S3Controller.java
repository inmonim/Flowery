package com.flowery.backend.controller;

import com.flowery.backend.amazon.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("storage")
public class S3Controller {
    private final S3Uploader s3Uploader;

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam Integer userId, @RequestPart(required = false) MultipartFile multipartFile) throws Exception {

        UUID uuid = UUID.nameUUIDFromBytes(userId.toString().getBytes());

        return new ResponseEntity<>("ff", HttpStatus.ACCEPTED);
    }

    @PostMapping("/test")
    public ResponseEntity<String> test(@RequestPart(required = false) MultipartFile[] multipartFile) throws Exception {

        for(int i=0; i<multipartFile.length; i++){
            System.out.println(multipartFile[i].getName());
        }

        return new ResponseEntity<>("ff", HttpStatus.ACCEPTED);
    }

}