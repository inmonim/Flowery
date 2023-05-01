package com.flowery.backend.sevice;

import com.flowery.backend.model.entity.Messages;
import com.flowery.backend.repository.MessagesRepository;
import org.springframework.stereotype.Service;

@Service
public class MessagesService {

    private MessagesRepository messagesRepository;

    MessagesService(MessagesRepository messagesRepository){
        this.messagesRepository = messagesRepository;
    }

    public Messages findById(int code){
        return messagesRepository.findById(code).get();
    }


    public Messages findByMessageId(int id){
        Messages message = messagesRepository.findByMessageId(id);
//        기본 제공하는 findby를 사용해서 repository 안 만들고 할 때
//        Messages message = messagesRepository.findByMessageId(id).get();
        return message;

    }

    public Messages createCard(Messages message){
//        Messages message = new Messages();
//        message.setMessage(messages.getMessage());
//        message.setVideo(messages.getVideo());
//        message.setPicture(messages.getPicture());
        return messagesRepository.save(message);
    }

}
