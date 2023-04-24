package com.flowery.backend.controller;


import com.flowery.backend.model.entity.Users;
import com.flowery.backend.sevice.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/")
public class Hi {

    private UsersService usersService;

    Hi(UsersService usersService){
        this.usersService = usersService;
    }

    @GetMapping("hi")
    public ResponseEntity<Users> hi(@RequestParam("user_id") int user_id){
        return new ResponseEntity<>(usersService.findByUsersId(user_id), HttpStatus.ACCEPTED);
    }

}
