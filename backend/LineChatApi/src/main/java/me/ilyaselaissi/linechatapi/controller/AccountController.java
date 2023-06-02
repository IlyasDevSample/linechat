package me.ilyaselaissi.linechatapi.controller;

import me.ilyaselaissi.linechatapi.dto.UserDTO;
import me.ilyaselaissi.linechatapi.dto.UserResponseDTO;
import me.ilyaselaissi.linechatapi.model.User;
import me.ilyaselaissi.linechatapi.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

    UserService userService;
    public AccountController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserDTO userDTO) {
        if (userDTO == null) {
            return ResponseEntity.badRequest().build();
        }
        User user = userService.register(userDTO);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }
        UserResponseDTO userResponseDTO = new UserResponseDTO(
                user.getUsername(),
                user.getFullName(),
                user.getEmail(),
                user.getUserStatus().getStatusType(),
                user.getLastActive().toString(),
                user.getCreatedAt().toString(),
                user.getAvatar(),
                user.isEmailVerified()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponseDTO);
    }

}
