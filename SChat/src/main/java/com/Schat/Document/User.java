package com.Schat.Document;

import com.Schat.Enum.Status;
import lombok.Data;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Data
@Document
public class User {
    @Id
    private String userId;

    private String username ;
    private String nickname;

    @NonNull
    private String email;
    private int Number;
    private String password ;

//    private  String role;
    private Status status;

}
