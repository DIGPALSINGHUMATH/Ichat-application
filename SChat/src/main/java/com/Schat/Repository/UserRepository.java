package com.Schat.Repository;

import com.Schat.Document.User;
import com.Schat.Enum.Status;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findAllByStatus(Status status);
}
