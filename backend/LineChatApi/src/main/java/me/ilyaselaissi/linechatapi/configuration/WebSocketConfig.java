package me.ilyaselaissi.linechatapi.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${app.frontend-url}")
    private String FRONTEND_URL;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // websocket endpoint for the client
        registry
                .addEndpoint("/ws")
                .setAllowedOrigins(FRONTEND_URL)
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // prefix for the client to subscribe to messages from the server
        registry.enableSimpleBroker("/topic");
        // prefix for the client to send messages to the server
        registry.setApplicationDestinationPrefixes("/app");
    }
}