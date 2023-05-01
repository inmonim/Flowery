package com.flowery.backend.controller;

import com.flowery.backend.model.dto.MessagesDto;
import com.flowery.backend.model.dto.MygardensDto;
import com.flowery.backend.model.entity.Messages;
import com.flowery.backend.sevice.MygardensService;
import com.google.zxing.*;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.client.j2se.MatrixToImageWriter;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("myGarden/")
public class MygardensController {

    private MygardensService mygardensService;


    MygardensController(MygardensService mygardensService){
        this.mygardensService = mygardensService;
    }

    @GetMapping("id")
    public ResponseEntity<List<MygardensDto>> findAllByUserId(){
        System.out.println("hhh");
        return new ResponseEntity<>(mygardensService.findAllByUserId(1), HttpStatus.ACCEPTED);
    }


    @PostMapping("get-card")
    public ResponseEntity<Messages> findByMessageId(@RequestBody Map<String, Integer> requestData) {

        int a = requestData.get("messageId");

        return new ResponseEntity<>(mygardensService.findByMessageId(a), HttpStatus.ACCEPTED);

    }


    @GetMapping("qrTest")
    public Object createQr(@RequestParam String url) throws WriterException, IOException {
        int width = 100;
        int height = 100;
        BitMatrix matrix = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, width, height);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            MatrixToImageWriter.writeToStream(matrix, "PNG", out);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(out.toByteArray());
        }
    }

}
