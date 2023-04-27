package com.flowery.backend.controller;

import com.flowery.backend.model.entity.Samples;
import com.flowery.backend.sevice.StoresService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("stores/")
public class StoresController {

    // 가게 도메인에서 상품, 가게 정보(모든 가게, 특정 가게, 특정 가게의 휴일 등)를 CRUD 가능함

    private StoresService storesService;


    StoresController(StoresService storesService){
        this.storesService = storesService;
    }


    @GetMapping("samples")
    public ResponseEntity<List<Samples>> findAllPicture(@RequestParam int goodsId){

        return new ResponseEntity<>(storesService.findAllByGoods(goodsId), HttpStatus.ACCEPTED);

    }

}
