package com.flowery.backend.sevice;

import com.flowery.backend.model.entity.Goods;
import com.flowery.backend.repository.GoodsRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GoodsService {

    private GoodsRepository goodsRepository;

    GoodsService(GoodsRepository goodsRepository){
        this.goodsRepository = goodsRepository;
    }

    public List<Goods> findAll(){
        return goodsRepository.findAll();
    }

}
