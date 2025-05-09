package com.Schat.Services;

import com.Schat.Document.User;
import com.Schat.Enum.Status;
import com.Schat.Repository.UserRepository;
import com.Schat.dto.loginRequestDto;
import com.Schat.dto.loginResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final  UserRepository UserRepo;


    public  void saveUser( User user){
        user.setStatus(Status.ONLINE);
        UserRepo.save(user);
    }



    public loginResponseDto loginUser(loginRequestDto request) {
        User user = null;

        if (request.getUsername() != null && !request.getUsername().isEmpty()) {
            user = UserRepo.findByUsername(request.getUsername());
        }

        if (user == null && request.getEmail() != null && !request.getEmail().isEmpty()) {
            user = UserRepo.findByEmail(request.getEmail());
        }

        if (user != null && user.getPassword().equals(request.getPassword())) {
            return new loginResponseDto(true, "Login successful", "dummy-token-123", user.getEmail());
        }

        return new loginResponseDto(false, "Invalid credentials", null, null);
    }



    public  void  disconectedUser(User user){
        var StorUser = UserRepo.findById(user.getNickname())
                .orElse(null);
        if(StorUser != null){
            StorUser.setStatus(Status.OFFLINE);
            UserRepo.save(StorUser);
        }
    }


    public List<User> findConnectedUser(){

        return  UserRepo.findAllByStatus(Status.ONLINE);
    }
    public Optional<User> findByUsernameAndPassword(String username, String email, String password) {
        return UserRepo.findByUsernameAndPassword(username, email , password);
    }


}
