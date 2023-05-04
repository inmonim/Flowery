package com.flowery.backend.sevice;

import com.flowery.backend.model.dto.GoodsDto;
import com.flowery.backend.model.entity.Goods;
import com.flowery.backend.model.entity.Samples;
import com.flowery.backend.model.entity.Stores;
import com.flowery.backend.repository.GoodsRepository;
import com.flowery.backend.repository.HolydaysRepository;
import com.flowery.backend.repository.SamplesRepository;
import com.flowery.backend.repository.StoreRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// 상점, 휴일, 상품, 상품 샘플 사진들 레포지토리를 가지고 있음

@Service
public class StoresService {
    private StoreRepository storeRepository;
    private HolydaysRepository holydaysRepository;
    private GoodsRepository goodsRepository;
    private SamplesRepository samplesRepository;

    StoresService(StoreRepository storeRepository, HolydaysRepository holydaysRepository,
                  GoodsRepository goodsRepository, SamplesRepository samplesRepository){
        this.storeRepository = storeRepository;
        this.holydaysRepository = holydaysRepository;
        this.goodsRepository = goodsRepository;
        this.samplesRepository =samplesRepository;
    }

    // 모든 상점 다 가져오기
    public List<Stores> findAllStores(){
        return storeRepository.findAll();
    }

    // 모든 상품들 다 가져오기
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

    // 가게 추가하기
    public Stores createStore(Stores store){
        return storeRepository.save(store);
    }

    public Stores findByStoreId(int storeId){
        Stores store = storeRepository.findById(storeId).get();
        return store;
    }

    // 특정 상품의 샘플 사진들 가져오기
    public List<Samples> findAllByGoods(int goodsId){

        Goods goods = goodsRepository.findById(goodsId).get();

        return samplesRepository.findAllByGoodsId(goods);

    }

}
