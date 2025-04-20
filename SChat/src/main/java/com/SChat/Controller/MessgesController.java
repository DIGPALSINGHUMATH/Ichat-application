package com.SChat.Controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class MessgesController {

    @PostMapping("topic/")
    public String Smassage(@RequestBody String massage ){

        return massage;
    }
}
