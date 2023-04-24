package com.flowery.backend.controller;

import com.flowery.backend.sevice.StoresService;
import com.flowery.backend.sevice.UsersService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("users/")
public class UsersController {

    private UsersService usersService;
    private StoresService storesService;

    UsersController(UsersService usersService, StoresService storesService){
        this.usersService = usersService;
        this.storesService = storesService;
    }

}
