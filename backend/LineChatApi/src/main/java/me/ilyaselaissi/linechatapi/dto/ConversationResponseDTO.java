package me.ilyaselaissi.linechatapi.dto;

import java.util.List;

public record ConversationResponseDTO(
        String idConversation,
        String username,
        String fullName,
        String status,
        String lastActive,
        String createdAt,
        String AvatarUrl,
        List<MessageResponseDTO> messages,
        String lastMessage
        ) {
}
