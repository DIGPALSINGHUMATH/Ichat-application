package com.SChat.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Massage {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY )
    private Long id ;

//    @NotNull(Massage = 'Not be null it be' )
    String contant;
    LocalDateTime timestamp;
    boolean seen = false;

    @ManyToOne
    @JoinColumn(name = "sender")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "resciver")
    private User resciver;

    @ManyToOne
    @JoinColumn(name = "ChatGround_id")
    public ChatGround chatGround;





}
