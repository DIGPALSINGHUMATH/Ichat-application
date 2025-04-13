package com.SChat.Repositry;

import com.SChat.Entity.ChatGround;
import com.SChat.Entity.Massage;
import com.SChat.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface userReositry extends JpaRepository<User, Long> {
   Optional<User> findByEmail(String email);
   Optional<User> findByEmaila(String password);



}
