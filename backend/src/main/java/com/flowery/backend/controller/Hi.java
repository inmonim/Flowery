package com.flowery.backend.controller;


import com.flowery.backend.model.entity.Goods;
import com.flowery.backend.model.entity.Stores;
import com.flowery.backend.model.entity.Users;
import com.flowery.backend.sevice.GoodsService;
import com.flowery.backend.sevice.StoresService;
import com.flowery.backend.sevice.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/")
public class Hi {

    private UsersService usersService;
    private StoresService storesService;
    private GoodsService goodsService;


    Hi(UsersService usersService, StoresService storesService, GoodsService goodsService){
        this.usersService = usersService;
        this.storesService = storesService;
        this.goodsService = goodsService;
    }

    @GetMapping("hi")
    public ResponseEntity<Users> hi(@RequestParam("user_id") int user_id){
        return new ResponseEntity<>(usersService.findByUsersId(user_id), HttpStatus.ACCEPTED);
    }

    @GetMapping("store/hi")
    public ResponseEntity<List<Stores>> hello(){
        return new ResponseEntity<>(storesService.findAllStores(), HttpStatus.ACCEPTED);
    }

    @GetMapping("goods/hi")
    public ResponseEntity<List<Goods>> goods(){
        return new ResponseEntity<>(goodsService.findAll(), HttpStatus.ACCEPTED);
    }

}
