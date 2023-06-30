package me.ilyaselaissi.linechatapi.event;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;

@Component
public class WebsocketEventListener {
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        // getting the username from the session header
        MessageHeaderAccessor headerAccessor =
                MessageHeaderAccessor.getAccessor(event.getMessage().getHeaders(),
                        MessageHeaderAccessor.class);
        StompHeaderAccessor stompHeaderAccessor = MessageHeaderAccessor.getAccessor(
                (Message<?>) headerAccessor.getHeader("simpConnectMessage"),
                StompHeaderAccessor.class);
        Principal principal = stompHeaderAccessor.getUser();
        String sessionId = stompHeaderAccessor.getSessionId();
        stompHeaderAccessor.getSessionAttributes().put(sessionId, principal);
        System.out.println("Received a new web socket connection: " + principal.getName()+" "+sessionId);


    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        System.out.println("Received a new web socket disconnection");
    }
}
