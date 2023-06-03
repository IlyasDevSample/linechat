package me.ilyaselaissi.linechatapi.controller;

import me.ilyaselaissi.linechatapi.dto.ResendConfirmationEmail;
import me.ilyaselaissi.linechatapi.dto.UserDTO;
import me.ilyaselaissi.linechatapi.dto.UserResponseDTO;
import me.ilyaselaissi.linechatapi.model.User;
import me.ilyaselaissi.linechatapi.service.user.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {
    @Value("${app.frontend-url}")
    private String FRONTEND_URL;
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

    @GetMapping("/confirm-email")
    public ResponseEntity<Map<String, String>> confirmEmail(@RequestParam String token) {
        if (token == null) {
            // If the token is invalid, return an error response
            Map<String, String> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Token does not exist on the request URL");
            return ResponseEntity.badRequest().body(response);

        }
        userService.confirmEmail(token);
        // Email confirmation successful, return a success response
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Email confirmed successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/resend-confirmation-email")
    public ResponseEntity<Map<String, String>> resendConfirmationEmail(@RequestBody ResendConfirmationEmail confirmationEmail) {
        if (confirmationEmail == null) {
            return ResponseEntity.badRequest().build();
        }
        userService.resendConfirmationEmail(confirmationEmail.username());
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Confirmation email sent successfully");
        return ResponseEntity.ok(response);
    }

}
