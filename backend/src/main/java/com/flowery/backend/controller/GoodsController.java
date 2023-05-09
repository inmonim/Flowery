package com.flowery.backend.controller;

import com.flowery.backend.amazon.S3Uploader;
import com.flowery.backend.model.entity.Goods;
import com.flowery.backend.model.entity.Samples;
import com.flowery.backend.sevice.GoodsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("goods")
public class GoodsController {
    // 가게 등록되는 상품에 관련된 CRUD.
    private GoodsService goodsService;
    private final Logger LOGGER = LoggerFactory.getLogger(GoodsController.class);
    private final S3Uploader s3Uploader;


    GoodsController(GoodsService goodsService, S3Uploader s3Uploader){
        this.goodsService = goodsService;
        this.s3Uploader = s3Uploader;
    }

    // 굿즈에 샘플 이미지 추가

    @PostMapping("/{goodsId}/sample")
    public ResponseEntity<Samples> createSample(@PathVariable("goodsId") Integer goodsId,
                                             @RequestPart MultipartFile picture
    ) throws Exception{
        LOGGER.info("createSample이 호출되었습니다.");
        try{
            String pictureUrl = s3Uploader.uploadFile(picture);


//            Samples createdSample = goodsService.createSample(goodsId, pictureUrl);;
//            return ResponseEntity.created(createdSample);
            return new ResponseEntity<Samples>(goodsService.createSample(goodsId, pictureUrl), HttpStatus.CREATED);
        }catch (Exception e){
            LOGGER.error("샘플 등록에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @DeleteMapping("/sample/{sampleId}")
    public ResponseEntity<?> deleteSample(@PathVariable("sampleId") Integer sampleId) {
        LOGGER.info("deleteSample이 호출되었습니다.");
        try {
            goodsService.deleteSample(sampleId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            LOGGER.error("샘플 삭제에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

}
