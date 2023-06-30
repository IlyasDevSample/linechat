package me.ilyaselaissi.linechatapi.controller;

import me.ilyaselaissi.linechatapi.dto.ConversationResponseDTO;
import me.ilyaselaissi.linechatapi.dto.MessageRequestDTO;
import me.ilyaselaissi.linechatapi.dto.MessageResponseDTO;
import me.ilyaselaissi.linechatapi.dto.UserResponseDTO;
import me.ilyaselaissi.linechatapi.exceptions.message.MessageException;
import me.ilyaselaissi.linechatapi.model.Conversation;
import me.ilyaselaissi.linechatapi.model.Message;
import me.ilyaselaissi.linechatapi.model.User;
import me.ilyaselaissi.linechatapi.service.message.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/message")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/send")
    public ResponseEntity<MessageResponseDTO> sendMessage(@RequestBody MessageRequestDTO messageDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        if (!currentPrincipalName.equals(messageDTO.sender())) {
            throw new MessageException("You are not legible to send this message");
        }
        Message message = messageService.saveUserMessage(messageDTO);
        MessageResponseDTO messageResponseDTO = new MessageResponseDTO(
                message.getId().toString(),
                message.getConversation().getId().toString(),
                message.getSender().getUsername(),
                message.getReceiver().getUsername(),
                message.getText(),
                message.getMessageStatus().getStatus(),
                message.getCreatedAt().toString(),
                message.getUpdatedAt().toString()
        );
        return ResponseEntity.ok(messageResponseDTO);
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationResponseDTO>> getConversations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        if (username == null) {
            throw new MessageException("You are not legible to get conversations");
        }
        List<Conversation> conversations = messageService.getConversations(username);
        List<ConversationResponseDTO> conversationsResponse = new ArrayList<>();

        for (Conversation conversation : conversations) {
            User otherUser = conversation.getUsers().stream()
                    .filter(user -> !user.getUsername().equals(username))
                    .findFirst()
                    .orElseThrow(() -> new IllegalStateException("Other user not found"));

            List<MessageResponseDTO> messages = conversation.getMessages().stream()
                    .map(message -> new MessageResponseDTO(
                            message.getId().toString(),
                            message.getConversation().getId().toString(),
                            message.getSender().getUsername(),
                            message.getReceiver().getUsername(),
                            message.getText(),
                            message.getMessageStatus().getStatus(),
                            message.getCreatedAt().toString(),
                            message.getUpdatedAt().toString()
                    ))
                    .toList();

            ConversationResponseDTO conversationResponse = new ConversationResponseDTO(
                    conversation.getId().toString(),
                    otherUser.getUsername(),
                    otherUser.getFullName(),
                    otherUser.getUserStatus().getStatusType(),
                    otherUser.getLastActive().toString(),
                    otherUser.getCreatedAt().toString(),
                    otherUser.getAvatar(),
                    messages,
                    messages.get(messages.size() - 1).message(),
                    messages.get(messages.size() - 1).createdAt()
            );

            conversationsResponse.add(conversationResponse);
        }

        return ResponseEntity.ok(conversationsResponse);
    }

}
