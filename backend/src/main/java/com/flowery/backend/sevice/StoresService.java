package com.flowery.backend.sevice;

import com.amazonaws.services.kms.model.NotFoundException;
import com.flowery.backend.model.dto.GoodsDto;
import com.flowery.backend.model.dto.StoresDto;
import com.flowery.backend.model.entity.Goods;
import com.flowery.backend.model.entity.Samples;
import com.flowery.backend.model.entity.Stores;
import com.flowery.backend.repository.GoodsRepository;
import com.flowery.backend.repository.HolydaysRepository;
import com.flowery.backend.repository.SamplesRepository;
import com.flowery.backend.repository.StoreRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

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
    public List<Stores> findAllStores(Integer permitted){
        List<Stores> result = storeRepository.findByPermit(permitted);

        return result;
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


    // 가게 정보 변경
    @Transactional
    public Stores editStore(Integer storeId, StoresDto storeDTO){
        Stores store = storeRepository.findById(storeId)
                .orElseThrow(() -> new NotFoundException("Store not found with id : " + storeId));

        // 수정하고자 하는 필드들만 업데이트
        store.setStorePhone(storeDTO.getStorePhone());
        store.setOpen(storeDTO.getOpen());
        store.setClose(storeDTO.getClose());
        store.setInfo(storeDTO.getInfo());

        Stores updatedStore = storeRepository.save(store);
        return updatedStore;
    }

    // 상품 삭제
    @Transactional
    public void deleteGoods(Integer goodsId) {
        goodsRepository.deleteByGoodsId(goodsId);
    }



    // 상품 등록
    public Goods createGoods(GoodsDto requestData) {
        System.out.println(0);
        Stores store = storeRepository.findById(requestData.getStoreId())
                .orElseThrow(() -> new StoreNotFoundException("해당 id의 상점이 존재하지 않습니다."));
        Goods goods = new Goods();
        goods.setStoreId(store);
        goods.setGoodsName(requestData.getGoodsName());
        goods.setGoodsPrice(requestData.getGoodsPrice());
        goods.setGoodsDetail(requestData.getGoodsDetail());

        return goodsRepository.save(goods);
    }
    public Goods updateGoods(GoodsDto requestData, Integer goodsId) {
        Goods goods = goodsRepository.findById(goodsId)
                .orElseThrow(() -> new NotFoundException("goodsId not found with id : " + goodsId));

        goods.setGoodsDetail(requestData.getGoodsDetail());
        goods.setGoodsName(requestData.getGoodsName());
        goods.setGoodsPrice(requestData.getGoodsPrice());

        Goods updatedGoods = goodsRepository.save(goods);
        return updatedGoods;

    }

    public class StoreNotFoundException extends RuntimeException {
        public StoreNotFoundException(String message) {
            super(message);
        }
    }


}
