package com.flowery.backend.controller;

import com.flowery.backend.model.entity.Samples;
import com.flowery.backend.sevice.GoodsService;
import com.flowery.backend.sevice.SamplesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("goods/")
public class GoodsController {
    private GoodsService goodsService;

    GoodsController( GoodsService goodsService, SamplesService samplesService){
        this.goodsService = goodsService;
    }

    @GetMapping("samples")
    public ResponseEntity<List<Samples>> findAllPicture(@RequestParam int goodsId){

        return new ResponseEntity<>(goodsService.findAllByGoods(goodsId), HttpStatus.ACCEPTED);

    }

}
