package com.SChat.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.mapping.Value;

import java.util.Set;

@Getter
@Setter
@Entity
public class ChatGround {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     public long id;

     @ManyToOne
     @JoinColumn(name = "user_id")
     public  User user;

     @OneToMany(mappedBy = "ChatGroundM" , cascade = CascadeType.ALL)
     public Set<Massage> massageSet;



}
