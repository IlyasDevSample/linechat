package me.ilyaselaissi.linechatapi.dto;

public record MessageRequestDTO(
        String sender,
        String receiver,
        String message,
        String conversationId
) {
}
