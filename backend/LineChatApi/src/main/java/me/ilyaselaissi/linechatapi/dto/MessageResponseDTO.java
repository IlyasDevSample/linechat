package me.ilyaselaissi.linechatapi.dto;

public record MessageResponseDTO(
        String idMessage,
        String sender,
        String receiver,
        String message,
        String status,
        String createdAt,
        String updatedAt
) {
}
