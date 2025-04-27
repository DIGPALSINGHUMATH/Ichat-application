package com.Schat.Repository;

import com.Schat.Document.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface chatRoomRepository extends MongoRepository<ChatRoom, String> {

    Optional<ChatRoom> findBySenderIdAndReceiverId(String senderId, String receiverId);

}
