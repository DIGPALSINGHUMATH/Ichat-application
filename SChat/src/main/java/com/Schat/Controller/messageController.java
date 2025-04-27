package com.Schat.Controller;

import com.Schat.Document.Message;
import com.Schat.OtherThink.ChatNotification;
import com.Schat.Services.messageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class messageController {
    private final SimpMessagingTemplate messagingTemplate;
    private final messageService messageService;

    @MessageMapping("/chat")
    public  void processMessage(@Payload Message message){
        Message saveMessage = messageService.save(message);
        messagingTemplate.convertAndSendToUser(
                message.getReveiverId(),"/queue/massage"
                , ChatNotification.builder()
                        .id(saveMessage.getId())
                        .senderId(saveMessage.getSenderId())
                        .reveiverId(message.getReveiverId())
                        .content(message.getContant())
                        .build()
        );

    }

    @GetMapping("/message/{senderId}/{reveiverId}")
    public ResponseEntity<List<Message>> findChatMessage(@PathVariable("senderId") String SenderId,@PathVariable("reveiverId") String reveiverId){
        return  ResponseEntity.ok(messageService.findMessages(SenderId,reveiverId));
    }
}
