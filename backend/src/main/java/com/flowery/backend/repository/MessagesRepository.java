package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessagesRepository extends JpaRepository<Messages, Integer> {
    public Messages findByMessageId(int messageId);
}
