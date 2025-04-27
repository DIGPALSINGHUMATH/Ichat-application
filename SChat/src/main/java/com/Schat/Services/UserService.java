package com.Schat.Services;

import com.Schat.Document.User;
import com.Schat.Enum.Status;
import com.Schat.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final  UserRepository UserRepo;


    public  void saveUser( User user){
        user.setStatus(Status.ONLINE);
        UserRepo.save(user);
    }

    public  void  dicconectedUser(User user){
        var StorUser = UserRepo .findById(user.getNickname())
                .orElse(null);
        if(StorUser != null){
            StorUser.setStatus(Status.OFFLINE);
            UserRepo.save(StorUser);
        }
    }

    public List<User> findConnectedUser(){
        return  UserRepo.findAllByStatus(Status.ONLINE);
    }


}
