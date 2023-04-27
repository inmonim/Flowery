package com.flowery.backend.sevice;

import com.flowery.backend.model.dto.GoodsDto;
import com.flowery.backend.model.entity.Goods;
import com.flowery.backend.model.entity.Samples;
import com.flowery.backend.model.entity.Stores;
import com.flowery.backend.repository.GoodsRepository;
import com.flowery.backend.repository.SamplesRepository;
import com.flowery.backend.repository.StoreRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GoodsService {

    private GoodsRepository goodsRepository;
    private StoreRepository storeRepository;
    private SamplesRepository samplesRepository;

    GoodsService(GoodsRepository goodsRepository, StoreRepository storeRepository, SamplesRepository samplesRepository){
        this.goodsRepository = goodsRepository;
        this.storeRepository = storeRepository;
        this.samplesRepository = samplesRepository;
    }

    public List<GoodsDto> findAll(){

        List<Goods> ori = goodsRepository.findAll();
        List<GoodsDto> result = new ArrayList<>();

        for(int i=0; i<ori.size(); i++) {

            GoodsDto tmp = new GoodsDto();

            tmp.setStoreId(ori.get(i).getStoreId().getStoreId());
            tmp.setGoodsId(ori.get(i).getGoodsId());
            tmp.setGoodsName(ori.get(i).getGoodsName());
            tmp.setGoodsDetail(ori.get(i).getGoodsDetail());
            tmp.setGoodsPrice(ori.get(i).getGoodsPrice());

            System.out.println();

            result.add(tmp);

        }


        return result;
    }

    public List<Samples> findAllByGoods(int goodsId){

        Goods goods = goodsRepository.findById(goodsId).get();

        return samplesRepository.findAllByGoodsId(goods);

    }

}
