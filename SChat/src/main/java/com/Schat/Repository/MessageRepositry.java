package com.Schat.Repository;

import com.Schat.Document.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepositry extends MongoRepository<Message, String> {
    List<Message> findBychatId(String s);
}
