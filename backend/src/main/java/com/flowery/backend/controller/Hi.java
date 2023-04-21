package com.flowery.backend.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class Hi {

    @GetMapping("hi")
    public ResponseEntity<String> hi(){
        return new ResponseEntity<>("hi", HttpStatus.ACCEPTED);
    }

}
