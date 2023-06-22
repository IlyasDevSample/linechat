package me.ilyaselaissi.linechatapi.controller;

import me.ilyaselaissi.linechatapi.dto.MessageResponseDTO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;
    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }
    @MessageMapping("/send")
    public void send(@Payload MessageResponseDTO messageResponseDTO) {
        System.out.println(messageResponseDTO.sender());
        messagingTemplate
                .convertAndSend("/topic/user/" + messageResponseDTO.receiver(), messageResponseDTO);
    }
}
