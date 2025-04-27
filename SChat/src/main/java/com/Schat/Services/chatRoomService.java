package com.Schat.Services;

import com.Schat.Document.ChatRoom;
import com.Schat.Repository.chatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class chatRoomService {

    private final chatRoomRepository chatRoomRepository;

    Optional<String> getChatRoom(String senderId, String receiverID, boolean createChatRoomIfNotExist){
        return  chatRoomRepository.findBySenderIdAndReceiverId(senderId,receiverID)
                .map(ChatRoom::getChatId)
                .or(()->{
                    if(createChatRoomIfNotExist){
                    var chatId = createChatRoomId(senderId, receiverID);
                    return Optional.of(chatId);
                    }
                    return Optional.empty();
                });
    }

    private String createChatRoomId(String senderId, String receiverId) {
        var charId = String.format("%s_%s", senderId,receiverId);

        var senderReceiver  =ChatRoom.builder()
                .chatId(charId)
                .senderId(senderId)
                .receiverId(receiverId)
                .build();
        var receiverSender = ChatRoom.builder()
                .chatId(charId)
                .receiverId(senderId)
                .senderId(receiverId)
                .build();
        chatRoomRepository.save(senderReceiver);
        chatRoomRepository.save(receiverSender);
         return charId;
    }


}
