package com.flowery.backend.controller;

import com.flowery.backend.model.dto.GoodsDto;
import com.flowery.backend.model.dto.ReservationDto;
import com.flowery.backend.model.dto.StoresDto;
import com.flowery.backend.model.entity.Goods;
import com.flowery.backend.model.entity.Samples;
import com.flowery.backend.model.entity.Stores;
import com.flowery.backend.sevice.ReservationService;
import com.flowery.backend.sevice.StoresService;
import org.apache.catalina.Store;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("stores")
public class StoresController {

    // 가게 도메인에서 상품, 가게 정보(모든 가게, 특정 가게, 특정 가게의 휴일 등)를 CRUD 가능함

    private StoresService storesService;
    private final Logger LOGGER = LoggerFactory.getLogger(StoresController.class);



    StoresController(StoresService storesService){
        this.storesService = storesService;
    }

    @GetMapping
    public ResponseEntity<List<Stores>> findAllStores() {
        LOGGER.info("findAllStores가 호출되었습니다.");
        Integer permitted = 1;
        return new ResponseEntity<List<Stores>>(storesService.findAllStores(permitted), HttpStatus.OK);
    }

    @PostMapping("/info")
    public ResponseEntity<Stores> findByStoreId(@RequestBody Map<String, Integer> requestData) {
        LOGGER.info("findByStoreId가 호출되었습니다.");
        int storeId = requestData.get("storeId");
        return new ResponseEntity<Stores>(storesService.findByStoreId(storeId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Stores> createStore(@RequestBody Stores store){
        LOGGER.info("createStore가 호출되었습니다.");
        Stores createdStore = storesService.createStore(store);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStore);
    }

    @GetMapping("/samples")
    public ResponseEntity<List<Samples>> findAllPicture(@RequestParam int goodsId){

        return new ResponseEntity<>(storesService.findAllByGoods(goodsId), HttpStatus.ACCEPTED);

    }

    // 상품을 추가
    @PostMapping("/goods")
    public ResponseEntity<Goods> createGoods(@RequestBody GoodsDto goods)  throws Exception {
        LOGGER.info("createGoods가 호출되었습니다.");

        try{
            return new ResponseEntity<Goods>(storesService.createGoods(goods), HttpStatus.CREATED);
        }catch (Exception e){
            LOGGER.error("상품 등록에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }


    // 상품을 삭제
    @DeleteMapping("/goods/{goodsId}")
    public ResponseEntity<Void> deleteGoods(@PathVariable("goodsId") Integer goodsId){
        LOGGER.info("deleteGoods가 호출되었습니다.");
        storesService.deleteGoods(goodsId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/goods/{goodsId}")
    public ResponseEntity<Goods> updateGoods(@PathVariable("goodsId") Integer goodsId,
                                            @RequestBody GoodsDto requestData
    ){
        LOGGER.info("updateGoods가 호출되었습니다.");
//        return new ResponseEntity<Goods>(storesService.updateGoods(requestData, goodsId), HttpStatus.ACCEPTED);

        try {
            return new ResponseEntity<Goods>(storesService.updateGoods(requestData, goodsId), HttpStatus.ACCEPTED);
//        } catch (ReservationService.ReservationNotFoundException e) {
//            LOGGER.error("예약을 찾을 수 없습니다.", e);
//            return ResponseEntity.notFound()
//                    .build();
//        } catch (ReservationService.NotAuthorizedException e) {
//            LOGGER.error("해당 판매자의 예약이 아닙니다.", e);
//            return ResponseEntity.notFound()
//                    .build();
//        } catch (ReservationService.NotPermittedException e) {
//            LOGGER.error("승인 거절된 예약입니다.", e);
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(null);
//        } catch (ReservationService.AlreadyPermittedException e) {
//            LOGGER.error("이미 승인된 예약입니다.", e);
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(null);
        } catch (Exception e){
            LOGGER.error("상품 정보 변경에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
//
//        return ResponseEntity.noContent().build();
    }
    // 상점의 정보를 수정
    @PatchMapping("/{storeId}")
    public ResponseEntity<Stores> editStore(@PathVariable("storeId") Integer storeId,
                                            @RequestBody StoresDto storeDto){
        LOGGER.info("editStore 호출되었습니다.");
        Stores updatedStore = storesService.editStore(storeId, storeDto);
        return ResponseEntity.ok(updatedStore);
    }



}
