package me.ilyaselaissi.linechatapi.dto;

public record UserResponseDTO(
        String username,
        String fullName,
        String email,
        String status,
        String lastActive,
        String createdAt,
        String AvatarUrl,
        boolean isEmailVerified

) {
}
