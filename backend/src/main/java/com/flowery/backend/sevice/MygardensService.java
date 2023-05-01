package com.flowery.backend.sevice;

import com.flowery.backend.model.dto.MessagesDto;
import com.flowery.backend.model.dto.MygardensDto;
import com.flowery.backend.model.entity.Messages;
import com.flowery.backend.model.entity.Mygardens;
import com.flowery.backend.model.entity.Users;
import com.flowery.backend.repository.MessagesRepository;
import com.flowery.backend.repository.MygardensRepository;
import com.flowery.backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MygardensService {

    private MygardensRepository mygardensRepository;
    private UsersRepository usersRepository;
    private MessagesRepository messagesRepository;


    MygardensService(MygardensRepository mygardensRepository, UsersRepository usersRepository,
                     MessagesRepository messagesRepository){
        this.mygardensRepository = mygardensRepository;
        this.usersRepository = usersRepository;
    }

    public List<MygardensDto> findAllByUserId(int code){

        Users user =  usersRepository.findById(code).get();

        List<Mygardens> list = mygardensRepository.findAllByUserId(user);
        List<MygardensDto> result = new ArrayList<>();


        for(int i=0; i<list.size(); i++){
            MygardensDto mygardensDto = new MygardensDto();
            mygardensDto.setUserId(code);
            mygardensDto.setMessageId(list.get(i).getMessageId().getMessageId());
            mygardensDto.setGardenId(list.get(i).getGardenId());
            result.add(mygardensDto);
        }

        return result;
    }



}
