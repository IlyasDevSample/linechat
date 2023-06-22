package me.ilyaselaissi.linechatapi.controller;

import me.ilyaselaissi.linechatapi.dto.UserResponseDTO;
import me.ilyaselaissi.linechatapi.model.User;
import me.ilyaselaissi.linechatapi.service.user.UserService;
import me.ilyaselaissi.linechatapi.service.user.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/profile")
public class ProfileController {
    UserService userService;
    public ProfileController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping ("/details")
    public ResponseEntity<UserResponseDTO> getProfileDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userService.getUserDetails(currentPrincipalName);
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
        return ResponseEntity.ok(userResponseDTO);
    }
}
