package com.flowery.backend.controller;

import com.flowery.backend.model.dto.MygardensDto;
import com.flowery.backend.model.entity.Mygardens;
import com.flowery.backend.sevice.MygardensService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("myGarden/")
public class MygardensController {

    private MygardensService mygardensService;

    MygardensController(MygardensService mygardensService){
        this.mygardensService = mygardensService;
    }

    @GetMapping("id")
    public ResponseEntity<List<MygardensDto>> findAllByUserId(){
        return new ResponseEntity<>(mygardensService.findAllByUserId(1), HttpStatus.ACCEPTED);
    }

}
