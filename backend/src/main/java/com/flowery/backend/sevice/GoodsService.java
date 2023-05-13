package com.flowery.backend.sevice;

import com.flowery.backend.model.dto.GoodsDto;
import com.flowery.backend.model.entity.Goods;
import com.flowery.backend.model.entity.Samples;
import com.flowery.backend.model.entity.Stores;
import com.flowery.backend.repository.GoodsRepository;
import com.flowery.backend.repository.SamplesRepository;
import com.flowery.backend.repository.StoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class GoodsService {
    private GoodsRepository goodsRepository;
    private SamplesRepository samplesRepository;
    private StoreRepository storeRepository;

    GoodsService(GoodsRepository goodsRepository,
                 SamplesRepository samplesRepository,
                 StoreRepository storeRepository) {
        this.goodsRepository = goodsRepository;
        this.samplesRepository = samplesRepository;
        this.storeRepository = storeRepository;
    }

    public Samples createSample(Integer goodsId, String pictureUrl) {
        Goods goods = goodsRepository.findById(goodsId).orElseThrow(() -> new NoSuchElementException("해당 goods_id가 없습니다."));

        Samples sample = new Samples();
        sample.setPicture(pictureUrl);
        sample.setGoodsId(goods);

//        goods.getSamples().add(sample);
//        goodsRepository.save(goods);
        return samplesRepository.save(sample);
    }

    public void deleteSample(Integer sampleId) {
        Samples sample = samplesRepository.findById(sampleId).orElseThrow(() -> new NoSuchElementException("해당 sample_id가 없습니다."));
        samplesRepository.delete(sample);
    }

    // goods에 해당하는 samples를 가져옴
    public List<Samples> findByGoodsId(Integer goodsId) {
        Goods goods = goodsRepository.findById(goodsId)
                .orElseThrow(() -> new NoSuchElementException("Goods not found with ID: " + goodsId));
        List<Samples> samples = samplesRepository.findAllByGoodsId(goods);

        if (samples.isEmpty()) {
            throw new NoSuchElementException("No samples found for Goods with ID: " + goodsId);
        }

        return samples;
    }

//  상품 목록 조회하기.
    public List<Goods> findAllBystoreId(GoodsDto goodsDto) {
        Integer storeId = goodsDto.getStoreId();
        Stores store = storeRepository.findByStoreId(storeId);
        if (store == null) {
            throw new NoSuchElementException("해당 messageId가 없습니다.");
        }

        List<Goods> goodsList = goodsRepository.findGoodsByStoreId(store);
        return goodsList;
    }
}
