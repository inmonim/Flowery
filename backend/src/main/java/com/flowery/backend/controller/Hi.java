package com.flowery.backend.controller;


import com.flowery.backend.model.dto.GoodsDto;
import com.flowery.backend.model.entity.*;
import com.flowery.backend.sevice.*;
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
    private FlowerService flowerService;
    private MessagesService messagesService;
    private MygardensService mygardensService;


    Hi(UsersService usersService, StoresService storesService, GoodsService goodsService, FlowerService flowerService
    ,MessagesService messagesService, MygardensService mygardensService){
        this.usersService = usersService;
        this.storesService = storesService;
        this.goodsService = goodsService;
        this.flowerService = flowerService;
        this.messagesService = messagesService;
        this.mygardensService = mygardensService;
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
    public ResponseEntity<List<GoodsDto>> goods(){
        return new ResponseEntity<>(goodsService.findAll(), HttpStatus.ACCEPTED);
    }

    @GetMapping("flower/hi")
    public ResponseEntity<Flowers> flower(){
        return new ResponseEntity<>(flowerService.findFlower(1), HttpStatus.ACCEPTED);
    }

    @GetMapping("message/hi")
    public ResponseEntity<Messages> message(){
        return new ResponseEntity<>(messagesService.findById(1), HttpStatus.ACCEPTED);
    }


}
