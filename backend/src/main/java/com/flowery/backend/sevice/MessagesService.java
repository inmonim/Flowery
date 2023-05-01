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

}
