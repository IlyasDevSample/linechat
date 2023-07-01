package me.ilyaselaissi.linechatapi.controller;

import me.ilyaselaissi.linechatapi.dto.MessageRequestDTO;
import me.ilyaselaissi.linechatapi.dto.MessageResponseDTO;
import me.ilyaselaissi.linechatapi.model.Message;
import me.ilyaselaissi.linechatapi.service.message.MessageService;
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
    private final MessageService messageService;

    public ChatController(SimpMessagingTemplate messagingTemplate, MessageService messageService) {
        this.messagingTemplate = messagingTemplate;
        this.messageService = messageService;
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
        try {
            Message message = messageService.saveUserMessage(messageDTO);
            MessageResponseDTO messageResponseDTO = new MessageResponseDTO(
                    message.getId().toString(),
                    message.getConversation().getId().toString(),
                    message.getSender().getUsername(),
                    message.getReceiver().getUsername(),
                    message.getText(),
                    message.getMessageStatus().getStatus(),
                    message.getCreatedAt().toGMTString(),
                    message.getUpdatedAt().toGMTString()
            );
            messagingTemplate.convertAndSendToUser(messageDTO.receiver(), "/queue/private", messageResponseDTO);
        }catch (Exception e){
            messagingTemplate.convertAndSendToUser(principal.getName(), "/queue/errors", e.getMessage());
        }
    }
}
