package me.ilyaselaissi.linechatapi.controller;

import me.ilyaselaissi.linechatapi.dto.*;
import me.ilyaselaissi.linechatapi.model.User;
import me.ilyaselaissi.linechatapi.service.user.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/confirm-email")
    public ResponseEntity<StatusResponseDTO> confirmEmail(@RequestParam String token) {
        if (token == null) {
            // If the token is invalid, return an error response
            StatusResponseDTO statusResponseDTO =
                    new StatusResponseDTO("error", "please provide a valid token");
            return ResponseEntity.badRequest().body(statusResponseDTO);

        }
        userService.confirmEmail(token);
        // Email confirmation successful, return a success response
        StatusResponseDTO statusResponseDTO =
                new StatusResponseDTO("success", "Email confirmed successfully");
        return ResponseEntity.ok(statusResponseDTO);
    }

    @PostMapping("/resend-confirmation-email")
    public ResponseEntity<StatusResponseDTO> resendConfirmationEmail(@RequestBody ResendConfirmationEmailDTO confirmationEmail) {
        if (confirmationEmail == null) {
            return ResponseEntity.badRequest().build();
        }
        userService.resendConfirmationEmail(confirmationEmail.username());
        StatusResponseDTO statusResponseDTO =
                new StatusResponseDTO("success", "Confirmation email sent successfully");
        return ResponseEntity.ok(statusResponseDTO);
    }

    @PostMapping("/change-password")
    public ResponseEntity<StatusResponseDTO> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        if (changePasswordDTO == null) {
            return ResponseEntity.badRequest().build();
        }
        userService.changePassword(changePasswordDTO);
        StatusResponseDTO statusResponseDTO =
                new StatusResponseDTO("success", "Password changed successfully");
        return ResponseEntity.ok(statusResponseDTO);
    }

    @GetMapping("/forgot-password")
    public ResponseEntity<StatusResponseDTO> forgotPassword(@RequestParam String email) {
        if (email == null) {
            return ResponseEntity.badRequest().build();
        }
        userService.forgotPassword(email);
        StatusResponseDTO statusResponseDTO =
                new StatusResponseDTO("success", "Password reset email sent successfully");
        return ResponseEntity.ok(statusResponseDTO);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<StatusResponseDTO> resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        if (resetPasswordDTO == null) {
            return ResponseEntity.badRequest().build();
        }
        userService.resetPassword(resetPasswordDTO);
        StatusResponseDTO statusResponseDTO =
                new StatusResponseDTO("success", "Password has been reset successfully");
        return ResponseEntity.ok(statusResponseDTO);
    }

}
