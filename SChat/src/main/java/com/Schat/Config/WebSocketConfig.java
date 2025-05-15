package com.Schat.Config;

import com.Schat.Document.Message;
import com.fasterxml.jackson.databind.json.JsonMapper;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.converter.*;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.user.DefaultUserDestinationResolver;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.List;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config){
        config.enableSimpleBroker("/topic", "/queue"); // broker destinations for server -> client
        config.setApplicationDestinationPrefixes("/app"); // client sends to server to  /app/... when we use to indicate in frontend connected url
        config.setUserDestinationPrefix("/user"); // for convertAndSendToUser
    }
        @Override
        public void registerStompEndpoints(StompEndpointRegistry registry){
            registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
        }


    @Override
    public boolean configureMessageConverters(List<MessageConverter> messageConverters) {
        DefaultContentTypeResolver resovlver =  new DefaultContentTypeResolver();
        resovlver.setDefaultMimeType(MimeTypeUtils.APPLICATION_JSON);
        MappingJackson2MessageConverter converter = new MappingJackson2MessageConverter();
        converter.setObjectMapper(new JsonMapper());
        converter.setContentTypeResolver(resovlver);
        messageConverters.add(new StringMessageConverter());
        messageConverters.add(new ByteArrayMessageConverter());
        messageConverters.add(converter);
        return false;
    }
//@Override
//public boolean configureMessageConverters(List<MessageConverter> messageConverters) {
//    // Setup a content type resolver to default to application/json.
//    DefaultContentTypeResolver resolver = new DefaultContentTypeResolver();
//    resolver.setDefaultMimeType(MimeTypeUtils.APPLICATION_JSON);
//
//    // Create a MappingJackson2MessageConverter with a custom JSON mapper if needed.
//    MappingJackson2MessageConverter jsonConverter = new MappingJackson2MessageConverter();
//    jsonConverter.setObjectMapper(new JsonMapper());
//    jsonConverter.setContentTypeResolver(resolver);
//
//    // Optionally, add JSON converter first to give it higher priority.
//    messageConverters.add(jsonConverter);
//    messageConverters.add(new StringMessageConverter());
//    messageConverters.add(new ByteArrayMessageConverter());
//
//    // Return true to use only these converters, without appending the defaults.
//    return true;
//}
//@Override
//public void afterSendCompletion(Message<?> message,
//                                MessageChannel channel,
//                                boolean sent,
//                                Exception ex) {
//    if (ex != null) {
//        System.err.println("Exception in WebSocket processing: " + ex.getMessage());
//        ex.printStackTrace();
//    }
//}

}