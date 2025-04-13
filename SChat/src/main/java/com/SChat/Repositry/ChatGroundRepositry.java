package com.SChat.Repositry;

import com.SChat.Entity.ChatGround;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatGroundRepositry  extends JpaRepository<ChatGround , Long> {
    Optional<ChatGround> findByUserId(Long UserId);
}
