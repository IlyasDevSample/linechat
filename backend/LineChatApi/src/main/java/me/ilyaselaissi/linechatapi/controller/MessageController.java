package me.ilyaselaissi.linechatapi.controller;

import me.ilyaselaissi.linechatapi.dto.MessageRequestDTO;
import me.ilyaselaissi.linechatapi.dto.MessageResponseDTO;
import me.ilyaselaissi.linechatapi.model.Message;
import me.ilyaselaissi.linechatapi.service.message.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/message")
public class MessageController {
    private final MessageService messageService;
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/send")
    public ResponseEntity<MessageResponseDTO> sendMessage(@RequestBody MessageRequestDTO messageDTO){
        Message message = messageService.saveUserMessage(messageDTO);
        MessageResponseDTO messageResponseDTO = new MessageResponseDTO(
                message.getSender().getUsername(),
                message.getReceiver().getUsername(),
                message.getText(),
                message.getMessageStatus().getStatus(),
                message.getCreatedAt().toString(),
                message.getUpdatedAt().toString()
        );
        return ResponseEntity.ok(messageResponseDTO);
    }
}
