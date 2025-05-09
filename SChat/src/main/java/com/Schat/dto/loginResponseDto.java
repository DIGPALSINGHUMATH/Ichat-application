package com.Schat.dto;


public class loginResponseDto {
    private boolean success;
    private String massage;
    private String email;
    private String token;


    public loginResponseDto(boolean success, String massage, String email, String token) {
        this.success = success;
        this.massage = massage;
        this.email = email;
        this.token = token;

    }

//    public String getUsername() {
//    }
//
//    public String getPassword() {
//
//    }
}

