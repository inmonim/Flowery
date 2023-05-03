package com.flowery.backend.controller;

import com.flowery.backend.model.dto.StoresDto;
import com.flowery.backend.model.entity.Samples;
import com.flowery.backend.model.entity.Stores;
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

//    @PatchMapping("/")
//    public ResponseEntity<Stores> editStore(@RequestBody StoresDto store){
//        LOGGER.info("editStore 호출되었습니다.");
//        return new ResponseEntity<Stores>(storesService.editStore(store), HttpStatus.OK);
//    }

}
