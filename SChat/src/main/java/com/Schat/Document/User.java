package com.Schat.Document;

import com.Schat.Enum.Status;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document
public class User {
    @Id
    private String userId;

    private String username ;
    private String nickname;
//    private String email;
//    private String Number;
    private String password ;

//    private  String role;
    private Status status;

}
