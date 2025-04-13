package com.SChat.Repositry;

import com.SChat.Entity.Massage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MassageRepositry extends JpaRepository<Massage , Long> {
        List<Massage> findByChatGroundId(Long ChatGroundId);
}
