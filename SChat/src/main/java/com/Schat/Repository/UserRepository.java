package com.Schat.Repository;

import com.Schat.Document.User;
import com.Schat.Enum.Status;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findAllByStatus(Status status);

    Optional<User> findByUsernameAndPassword(String username, String email, String password);

    User findByUsername(String username);
    User findByEmail(String email);


}
