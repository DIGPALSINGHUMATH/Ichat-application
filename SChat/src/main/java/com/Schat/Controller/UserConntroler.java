package com.Schat.Controller;


import com.Schat.Document.User;
import com.Schat.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class UserConntroler {
    private  final UserService userService;

    @MessageMapping("/user.addUser")
    @SendTo("/User/topic")
    private User addUser(@Payload User user){
        userService.saveUser(user);
        return user;
    }
    @MessageMapping("/user.disconnectUser")
    @SendTo("/User/topic")
    private User disconnected(@Payload User user){
        userService.dicconectedUser(user);
        return user;
    }

    public ResponseEntity<List<User>> findConnectionUser(){
        return ResponseEntity.ok(userService.findConnectedUser());
    }



}
