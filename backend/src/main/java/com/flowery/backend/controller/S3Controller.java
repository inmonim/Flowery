package com.flowery.backend.controller;

import com.flowery.backend.amazon.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("reservation/")
public class S3Controller {
    private final S3Uploader s3Uploader;

    @PostMapping("upload")
    public ResponseEntity<String> upload(@RequestParam Integer userId, @RequestPart(required = false) MultipartFile multipartFile) throws Exception {

        UUID uuid = UUID.nameUUIDFromBytes(userId.toString().getBytes());

        s3Uploader.uploadProfileImg(uuid, multipartFile);
        return new ResponseEntity<>("ff", HttpStatus.ACCEPTED);
    }
}