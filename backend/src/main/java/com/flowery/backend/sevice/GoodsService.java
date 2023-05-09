package com.flowery.backend.sevice;

import com.flowery.backend.model.entity.Goods;
import com.flowery.backend.model.entity.Samples;
import com.flowery.backend.repository.GoodsRepository;
import com.flowery.backend.repository.SamplesRepository;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class GoodsService {
    private GoodsRepository goodsRepository;
    private SamplesRepository samplesRepository;
    GoodsService(GoodsRepository goodsRepository, SamplesRepository samplesRepository) {
        this.goodsRepository = goodsRepository;
        this.samplesRepository = samplesRepository;}

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
}
