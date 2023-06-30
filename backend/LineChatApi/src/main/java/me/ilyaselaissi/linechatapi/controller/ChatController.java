package me.ilyaselaissi.linechatapi.controller;

import me.ilyaselaissi.linechatapi.dto.MessageRequestDTO;
import me.ilyaselaissi.linechatapi.dto.MessageResponseDTO;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.concurrent.ConcurrentHashMap;

@RestController
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;
    private ConcurrentHashMap<String, Principal> sessions = new ConcurrentHashMap<>();

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/send")
    public void send(
            @Payload MessageRequestDTO messageDTO,
            @Header("simpSessionId") String sessionId,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        // access the header
        Principal principal = (Principal) headerAccessor.getSessionAttributes().get(sessionId);

        if (!principal.getName().equals(messageDTO.sender())) {
            String errorMessage = "You are not legible to send this message";
            messagingTemplate.convertAndSendToUser(principal.getName(), "/queue/errors", errorMessage);
            return;
        }
        System.out.println("Sending message to " + messageDTO.receiver());
        messagingTemplate.convertAndSendToUser(messageDTO.receiver(), "/queue/private", messageDTO);
    }
}
