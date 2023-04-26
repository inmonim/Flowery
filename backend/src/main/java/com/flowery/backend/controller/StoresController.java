package com.flowery.backend.controller;

import com.flowery.backend.model.entity.Flowers;
import com.flowery.backend.sevice.FlowerService;
import com.flowery.backend.sevice.GoodsService;
import com.flowery.backend.sevice.StoresService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("stores/")
public class StoresController {

    // 가게 도메인에서 상품, 가게 정보를 CRUD 가능함

    private StoresService storesService;
    private GoodsService goodsService;

    StoresController(StoresService storesService, GoodsService goodsService){
        this.storesService = storesService;
        this.goodsService = goodsService;
    }




}
