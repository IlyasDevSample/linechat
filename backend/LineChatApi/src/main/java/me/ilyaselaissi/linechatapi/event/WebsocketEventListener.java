package me.ilyaselaissi.linechatapi.event;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

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
//        String jwtBearer = stompHeaderAccessor.getNativeHeader("jwt-bearer").get(0);
//        System.out.println(jwtBearer);


    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        System.out.println("Received a new web socket disconnection");
    }
}
