package com.Schat.Controller;


import com.Schat.Document.User;
import com.Schat.Services.UserService;
import com.Schat.dto.loginRequestDto;
import com.Schat.dto.loginResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
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
    @SendTo("/user/topic")
    public User addUser(@Payload User user){
        System.out.println("Received user: " + user);  // Log received user
        userService.saveUser(user);
        return user;
    }

    @MessageMapping("/user.loginUser")
    @SendToUser("/topic")
    public loginResponseDto loginUser(@Payload loginRequestDto request) {
        return userService.loginUser(request);
    }

    @MessageMapping("/user.disconnectUser")
    @SendTo("/user/topic")
    public User disconnected(@Payload User user){
        userService.disconectedUser(user);
        return user;
    }




    @GetMapping("/users/connected")
    public ResponseEntity<List<User>> findConnectionUser(){
        return ResponseEntity.ok(userService.findConnectedUser());
    }





}
