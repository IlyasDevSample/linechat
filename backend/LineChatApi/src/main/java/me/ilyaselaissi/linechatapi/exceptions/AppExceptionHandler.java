package me.ilyaselaissi.linechatapi.exceptions;

import me.ilyaselaissi.linechatapi.dto.StatusResponseDTO;
import me.ilyaselaissi.linechatapi.exceptions.core.InvalidFieldException;
import me.ilyaselaissi.linechatapi.exceptions.message.MessageException;
import me.ilyaselaissi.linechatapi.exceptions.token.InvalidTokenException;
import me.ilyaselaissi.linechatapi.exceptions.token.JwtException;
import me.ilyaselaissi.linechatapi.exceptions.user.DuplicateUserException;
import me.ilyaselaissi.linechatapi.exceptions.user.InvalidUserException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class AppExceptionHandler {

    @Value("${app.frontend-url}")
    private String FRONTEND_URL;

    @ExceptionHandler(value = {InvalidUserException.class, DuplicateUserException.class})
    public ResponseEntity<StatusResponseDTO> handleInvalidUserException(Exception e) {
        StatusResponseDTO statusResponseDTO =
                new StatusResponseDTO("error", e.getMessage());
        return ResponseEntity.badRequest().body(statusResponseDTO);
    }

    @ExceptionHandler(value = {InvalidTokenException.class})
    public ResponseEntity<StatusResponseDTO> handleInvalidTokenException(Exception e) {
        StatusResponseDTO statusResponseDTO =
                new StatusResponseDTO("error", e.getMessage());
        return ResponseEntity.badRequest().body(statusResponseDTO);
    }

    @ExceptionHandler(value = {JwtException.class})
    public ResponseEntity<StatusResponseDTO> handleJwtException(Exception e) {
        StatusResponseDTO statusResponseDTO =
                new StatusResponseDTO("error", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(statusResponseDTO);
    }

    @ExceptionHandler(value = {InvalidFieldException.class, MessageException.class})
    public ResponseEntity<StatusResponseDTO> handleInvalidFieldException(Exception e) {
        StatusResponseDTO statusResponseDTO =
                new StatusResponseDTO("error", e.getMessage());
        return ResponseEntity.badRequest().body(statusResponseDTO);
    }

    @ExceptionHandler(value = {IllegalStateException.class, RuntimeException.class})
    public ResponseEntity<StatusResponseDTO> handleIllegalStateException(Exception e) {
        StatusResponseDTO statusResponseDTO =
                new StatusResponseDTO("error", e.getMessage());
        return ResponseEntity.badRequest().body(statusResponseDTO);
    }
}
