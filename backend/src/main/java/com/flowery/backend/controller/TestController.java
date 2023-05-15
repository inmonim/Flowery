package com.flowery.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("test3")
public class TestController {

    @GetMapping("hi-user")
    public ResponseEntity<String> hello1(){
        return new ResponseEntity<>("hi user!", HttpStatus.ACCEPTED);
    }

    @GetMapping("hi-seller")
    public ResponseEntity<String> hello2(){
        return new ResponseEntity<>("hi seller!", HttpStatus.ACCEPTED);
    }

}
