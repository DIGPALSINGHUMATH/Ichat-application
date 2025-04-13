package com.SChat.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;


    private  String UserName;

    private String Password;

    private String Email;
    private  String PhoneNumber;
    private  String role;

//    create a sender and reciver . room onebyone  set

    @OneToMany(mappedBy = "sender_id" , cascade = CascadeType.ALL)
    private Set<Massage> sender;

    @OneToMany(mappedBy = "receiver_id" , cascade = CascadeType.ALL)
    private Set<Massage> reciver;

    @OneToMany(mappedBy = "ChatGround", cascade = CascadeType.ALL)
    private  Set<ChatGround> chatGrounds;



}
