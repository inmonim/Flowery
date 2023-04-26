package com.flowery.backend.controller;

import com.flowery.backend.sevice.SellerService;
import com.flowery.backend.sevice.StoresService;
import com.flowery.backend.sevice.UsersService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("users/")
public class UsersController {

    // Users에서 로그인 관련, 일반 유저, 판매자 구분 가능
    private UsersService usersService;
    private StoresService storesService;
    private SellerService sellerService;

    UsersController(UsersService usersService, StoresService storesService, SellerService sellerService){
        this.usersService = usersService;
        this.storesService = storesService;
        this.sellerService = sellerService;
    }

}
