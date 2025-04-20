package com.SChat.Config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;

@Slf4j
@Configuration
public class fireBaseConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException{

        InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("firebasekey.json");

        if(serviceAccount == null){
            throw new IOException("there are not firebase file. check firebse json path .");
        }

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if(FirebaseApp.getApps().isEmpty()){
            return FirebaseApp.initializeApp(options);
        }

        return FirebaseApp.getInstance();
    }
}
