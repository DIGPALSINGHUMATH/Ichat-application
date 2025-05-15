package com.Schat.Document;

import com.Schat.Enum.Status;
import lombok.Data;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Data
@Document
public class User {
    @Id
    private String userId;

    @Field("username")
    @Indexed(unique = true)
    private String username ;
    private String nickname;

    @NonNull
    @Field("email")
    @Indexed(unique = true)
    private String email;
    private int Number;
    private String password ;

//    private  String role;
    private Status status;

}
