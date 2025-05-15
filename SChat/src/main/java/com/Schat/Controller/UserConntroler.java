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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class UserConntroler {
    private  final UserService userService;

    @MessageMapping("/user.addUser")
    @SendTo("user/topic")
    public User addUser(@Payload User user){
        try{
            System.out.println("Received user: " + user);  // Log received user
            userService.saveUser(user);
            System.out.println("add user info : " + user);
            return user;
        }catch (Exception e){
            // Log the exception details for debugging
            System.err.println("Error in addUser: " + e.getMessage());
            e.printStackTrace();
            // Optionally, repackage and send an error message to the client

        }
        return null;
    }


    @MessageMapping("/user.loginUser")
    @SendToUser("/user/topic")
    public loginResponseDto loginUser(@Payload loginRequestDto request) {
        return userService.loginUser(request);
    }

    @MessageMapping("/user.disconnectUser")
    @SendTo("/user/topic")
    public User disconnected(@Payload User user){
        userService.disconectedUser(user);
        return user;
    }




    @GetMapping("/user/connected")
    @CrossOrigin(origins = "*")
    public ResponseEntity<List<User>> findConnectionUser(){
        return ResponseEntity.ok(userService.findConnectedUser());
    }





}
