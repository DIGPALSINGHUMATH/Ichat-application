package com.Schat.Services;

import com.Schat.Document.Message;
import com.Schat.Repository.MessageRepositry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class messageService {
    private final MessageRepositry messageRepositry;
    private final  chatRoomService chatRoomService;

    public Message save(Message message){
        var chatId = chatRoomService.getChatRoom(message.getSenderId(),message.getReveiverId(),true)
                .orElseThrow();
        message.setChatId(chatId);
        messageRepositry.save(message);
        return message;
    }

    public List<Message> findMessages(String SenderId ,String ReveiverId){
        var chatId = chatRoomService.getChatRoom(SenderId, ReveiverId ,false);
        return chatId.map(messageRepositry::findBychatId).orElse(new ArrayList<>());
    }





}
