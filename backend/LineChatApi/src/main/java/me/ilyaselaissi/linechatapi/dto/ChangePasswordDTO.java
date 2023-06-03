package me.ilyaselaissi.linechatapi.dto;

public record ChangePasswordDTO(String oldPassword, String newPassword, String username) {
}
